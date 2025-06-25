/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { WsClientConfig } from "~type/ws_config.type.ts";
import { BaseMtrWsClient } from "~class/base.class.ts";
import { createCreateMethods } from "~service/create/create.methods.ts";

export { GeradorClient };

class GeradorClient extends BaseMtrWsClient {
    public readonly create;
    constructor(config: WsClientConfig, token: string) {
        super(config, token);
        if (this.role !== "GERADOR") {
            throw new Error("Incompatible role for GeradorClient");
        }

        this.create = createCreateMethods(this._ctx, this._metaData);
    }
}
