// Create by Stallone L. de Souza (@stallone-dev) - 2025 - License: MPL-2.0

import type { WsClientConfig } from "~type/ws_config.type.ts";
import { BaseMtrWsClient } from "~class/base.class.ts";
import { FnWithInstrumentation } from "~util/instrumentation.ts";

import { methodTemplate, type TemplateResponseDTO } from "~service/main.service.ts";

export { GeradorClient };

class GeradorClient extends BaseMtrWsClient {
    constructor(config: WsClientConfig) {
        super(config);
        if (this.role !== "DESTINADOR") {
            throw new Error("Incompatible role for GeradorClient");
        }
    }

    public async methodTemplate(mtrId: string): Promise<TemplateResponseDTO> {
        return await FnWithInstrumentation(
            "Gerador.methodTemplate",
            () => methodTemplate({ token: this.token, baseUrl: this.baseUrl }, mtrId),
            { mtrId },
        );
    }
}
