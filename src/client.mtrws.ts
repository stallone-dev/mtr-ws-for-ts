// Create by Stallone L. de Souza (@stallone-dev) - 2025 - License: MPL-2.0
// deno-lint-ignore-file

import type { WsClientConfig, WsUserRole } from "~type/ws_config.type.ts";
import { GeradorClient } from "~class/gerador.class.ts";
import { DestinadorClient } from "~class/destinador.class.ts";
import { TransportadorClient } from "~class/transportador.class.ts";

export { createMtrWsClient };

function createMtrWsClient<T extends WsUserRole>(
    config: WsClientConfig<T>,
): T extends "GERADOR" ? GeradorClient
    : T extends "DESTINADOR" ? DestinadorClient
    : TransportadorClient {
    switch (config.role) {
        case "GERADOR":
            return new GeradorClient(config) as any;
        case "DESTINADOR":
            return new DestinadorClient(config) as any;
        case "TRANSPORTADOR":
            return new TransportadorClient(config) as any;
        default:
            throw new Error("Role não suportado");
    }
}
