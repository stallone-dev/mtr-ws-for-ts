/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// deno-lint-ignore-file

import type { WsClientConfig, WsUserRole } from "~type/ws_config.type.ts";
import { GeradorClient } from "~class/gerador.class.ts";
import { DestinadorClient } from "~class/destinador.class.ts";
import { TransportadorClient } from "~class/transportador.class.ts";

export { createMtrWsClient };

async function createMtrWsClient<T extends WsUserRole>(
    config: WsClientConfig<T>,
): Promise<
    T extends "GERADOR" ? GeradorClient
        : T extends "DESTINADOR" ? DestinadorClient
        : T extends "TRANSPORTADOR" ? TransportadorClient
        : never
> {
    switch (config.role) {
        case "GERADOR":
            return await GeradorClient.init(config) as any;
        case "DESTINADOR":
            return await DestinadorClient.init(config) as any;
        case "TRANSPORTADOR":
            return await TransportadorClient.init(config) as any;
        default:
            throw new Error("Role não suportado");
    }
}
