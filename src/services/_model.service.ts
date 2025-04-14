// Exemplo de modelo de service para seguir na lib

import { logger } from "~logger";
import { tracer } from "~telemetry";
import { responseSchema, type responseTypeDTO } from "./_model.dto.ts";
import { SpanStatusCode } from "@opentelemetry";

export { methodFn };

async function methodFn(token: string, url: URL, el?: unknown): Promise<responseTypeDTO> {
    const span = tracer.startSpan("methodName");
    logger.info(`Iniciando 'MethodName'`, {
        time: Date.now(),
    });
    logger.debug(`MethodName > InputParams`, {
        el: el,
    });

    try {
        const response = await fetch(`${url}/methodWS`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "",
            },
        });

        const raw = await response.json();
        logger.debug(">> Api response", raw);

        const parsed = responseSchema.safeParse(raw);

        if (!parsed.success) {
            logger.error("Falha na validação do DTO", parsed.error.flatten());
            span.setStatus({ code: SpanStatusCode.ERROR });
            span.recordException(parsed.error);
        }

        const dto = parsed.data;
        logger.info(`Consulta concluída`, {
            time: Date.now(),
        });

        return dto;
    } catch (err) {
        logger.error("Erro em nomeDoMetodo:", { err });
        span.recordException(err as Error);
        throw err;
    } finally {
        span.end();
    }
}
