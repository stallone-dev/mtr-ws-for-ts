import { logger } from "~logger";
import { tracer } from "~otel";
import { type Span, SpanStatusCode } from "@opentelemetry";

export { wrapInstrumented };

// deno-lint-ignore no-explicit-any
function wrapInstrumented<T extends (...args: any[]) => any>(
    fnName: string,
    fn: T,
): T {
    return ((...args: Parameters<T>): ReturnType<T> => {
        logCall(fnName, args);

        return tracer.startActiveSpan(fnName, (span: Span) => {
            try {
                const result = fn(...args);
                logResult(fnName, result);

                if (result instanceof Promise) {
                    return handlePromise(result, span, fnName) as ReturnType<T>;
                }

                span.setStatus({
                    code: SpanStatusCode.OK,
                });
                span.end();
                return result as ReturnType<T>;
            } catch (err) {
                handleSpanError(span, fnName, err as Error);
            }
        }) as ReturnType<T>;
    }) as T;
}

function logCall(fnName: string, args: unknown[]): void {
    logger.debug("Call Fn [{fnName}] with args [{args}] - {time}", { fnName, args, time: new Date() });
}

function logResult(fnName: string, result: unknown): void {
    logger.debug("Result of [{fnName}]: [{result}] - {time}", { fnName, result, time: new Date() });
}

function handleSpanError(span: Span, fnName: string, err: Error): never {
    logger.debug("Error in Fn [{fnName}]: [{err}] - {time}", { fnName, err, time: new Date() });
    span.recordException(err);
    span.setStatus({
        code: SpanStatusCode.ERROR,
        message: (err as Error).message,
    });
    span.end();
    throw err;
}

function handlePromise<T>(promise: Promise<T>, span: Span, fnName: string): Promise<T> {
    return promise
        .then((res) => {
            span.end();
            return res;
        })
        .catch((err) => handleSpanError(span, fnName, err));
}
