/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { WsClientConfig } from "~type/ws_config.type.ts";
import { BaseMtrWsClient } from "~class/base.class.ts";
import { FnWithInstrumentation } from "~util/instrumentation.ts";

import { methodTemplate, type TemplateResponseDTO } from "~service/main.service.ts";

export { DestinadorClient };

class DestinadorClient extends BaseMtrWsClient {
    constructor(config: WsClientConfig) {
        super(config);
        if (this.role !== "DESTINADOR") {
            throw new Error("Incompatible role for GeradorClient");
        }
    }

    public async methodTemplate(mtrId: string): Promise<TemplateResponseDTO> {
        return await FnWithInstrumentation(
            "Destinador.methodTemplate",
            () => methodTemplate({ token: this.token, baseUrl: this.baseUrl }, mtrId),
            { mtrId },
        );
    }
}
