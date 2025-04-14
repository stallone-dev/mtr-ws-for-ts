// src/client/createMtrWsClient.ts
import { WsBaseURL, type WsClientConfig, type WsUserRole } from "~type/ws_config.type.ts";
import { GeradorClient } from "./GeradorClient.ts";
import { DestinadorClient } from "./DestinadorClient.ts";
import { TransportadorClient } from "./TransportadorClient.ts";

// Overloads para definir os tipos de retorno com base no valor de config.role
export function createMtrWsClient(config: WsClientConfig & { role: "GERADOR" }): GeradorClient;
export function createMtrWsClient(config: WsClientConfig & { role: "DESTINADOR" }): DestinadorClient;
export function createMtrWsClient(config: WsClientConfig & { role: "TRANSPORTADOR" }): TransportadorClient;

export function createMtrWsClient(config: WsClientConfig): GeradorClient | DestinadorClient | TransportadorClient {
    switch (config.role) {
        case "GERADOR":
            return new GeradorClient(config);
        case "DESTINADOR":
            return new DestinadorClient(config);
        case "TRANSPORTADOR":
            return new TransportadorClient(config);
        default:
            throw new Error("Role não suportado");
    }
}
