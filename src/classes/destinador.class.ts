/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { WsClientConfig } from "~type/ws_config.type.ts";
import { BaseMtrWsClient } from "~class/base.class.ts";

import { receberLoteMTRMethod } from "~service/receive/receber_mtr/receber_mtr.service.ts";
import type {
    ReceberLoteMTRRequestDTO,
    ReceberLoteMTRResponseDTO,
} from "~service/receive/receber_mtr/receber_mtr.dto.ts";

export { DestinadorClient };

class DestinadorClient extends BaseMtrWsClient {
    constructor(config: WsClientConfig, token: string) {
        super(config, token);
        if (this.role !== "DESTINADOR") {
            throw new Error("Incompatible role for DestinadorClient");
        }
    }

    public async receberLoteMTR(receiveParams: ReceberLoteMTRRequestDTO): Promise<ReceberLoteMTRResponseDTO> {
        return await this.instrumentedCall(
            () => receberLoteMTRMethod(this.BASE_CTX, receiveParams),
            `${this.role}.receberMtr`,
            { mtrs: [...receiveParams.map((e) => e.manNumero)] },
        );
    }
}
