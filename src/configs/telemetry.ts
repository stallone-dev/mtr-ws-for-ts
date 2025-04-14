import { trace } from "@opentelemetry";

export { tracer };

/**
 * Tracer principal do projeto para rastreio dos dados gerados pela lib pelo OpenTelemetry
 */
const tracer = trace.getTracer("[mtr-ws-for-ts]");
