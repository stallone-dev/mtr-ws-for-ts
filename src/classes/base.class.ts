// Create by Stallone L. de Souza (@stallone-dev) - 2025 - License: MPL-2.0

import type { WsBaseURL, WsClientConfig } from "~type/ws_config.type.ts";

export { BaseMtrWsClient };

abstract class BaseMtrWsClient {
    protected readonly token: string;
    protected readonly baseUrl: WsBaseURL;
    protected readonly role: string;

    constructor(config: WsClientConfig) {
        this.token = config.token;
        this.baseUrl = config.baseUrl;
        this.role = config.role;
    }
}
