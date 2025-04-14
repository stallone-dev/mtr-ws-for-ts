// src/client/BaseMtrWsClient.ts
import type { WsClientConfig } from "./ws_config.type.ts";

export abstract class BaseMtrWsClient {
    protected readonly token: string;
    protected readonly baseUrl: string;
    protected readonly role: string;

    constructor(config: WsClientConfig) {
        this.token = config.token;
        this.baseUrl = config.baseUrl;
        this.role = config.role;
    }
}
