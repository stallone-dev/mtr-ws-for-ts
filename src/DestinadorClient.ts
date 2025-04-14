// src/client/GeradorClient.ts
import type { ConsultarMtrResponseDTO } from "./types/dto.type.ts";
import type { WsClientConfig } from "./types/ws_config.type.ts";
import { BaseMtrWsClient } from "./types/base_mtr_client.ts";
import { consultarMtr, gerarMtr, receberMtr } from "./types/consultar.mtr.ts";
import { logger } from "~logger"; // supondo que você tenha configurado LogTape
import { tracer } from "~telemetry"; // e também o tracer

export class DestinadorClient extends BaseMtrWsClient {
    constructor(config: WsClientConfig) {
        super(config);
        if (this.role !== "GERADOR") {
            throw new Error("Incompatible role for GeradorClient");
        }
    }

    public async consultarMtr(mtrId: string): Promise<ConsultarMtrResponseDTO> {
        const span = tracer.startSpan("GeradorClient.consultarMtr");
        logger.info(`Gerador: Consultando MTR ${mtrId}`);
        try {
            const result = await consultarMtr({ token: this.token, baseUrl: this.baseUrl }, mtrId);
            span.setAttribute("resultado.manNumero", result.manNumero);
            return result;
        } catch (error) {
            logger.error("Erro em consultarMtr:", { error });
            span.recordException(error as Error);
            throw error;
        } finally {
            span.end();
        }
    }
}
