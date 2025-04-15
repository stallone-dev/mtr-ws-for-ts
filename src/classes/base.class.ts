/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

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
