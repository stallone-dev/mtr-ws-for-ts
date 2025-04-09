// Create by Stallone L. de Souza (@stallone-dev) - 2025 - License: MPL-2.0

import { context, trace } from "npm:@opentelemetry/api";
import { logger } from "npm:logtape";
import type { MTRClientBase } from "../mod.ts";

const tracer = trace.getTracer("mtr-client");

export function emitirMTR(client: MTRClientBase) {
    return async () => {
        // Inicia um span para a operação de emissão
        const span = tracer.startSpan("emitirMTR");
        const traceId = span.spanContext().traceId;
        logger.info("Iniciando emissão de MTR", { traceId, feature: "emitirMTR" });

        try {
            // Executa a operação (exemplo: chamada a um endpoint)
            const response = await fetch(`${client.baseURL}/mtr/emissao`, {
                method: "POST",
                headers: {
                    Authorization: client.authToken,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            // Registra sucesso no span
            span.setStatus({ code: 1, message: "Success" });
            logger.info("MTR emitido com sucesso", { traceId });
        } catch (error) {
            // Registra o erro no span e loga o erro
            span.setStatus({ code: 2, message: error.message });
            logger.error("Erro ao emitir MTR", { traceId, error: error.message });
            throw error;
        } finally {
            // Finaliza o span para garantir que a operação esteja completa
            span.end();
        }
    };
}
