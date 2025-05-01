/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { ulid } from "@ulid";
import type { WsBaseURL, WsClientConfig } from "~type/ws_config.type.ts";
import { WsAuth } from "~service/main.service.ts";

export { BaseMtrWsClient };

abstract class BaseMtrWsClient {
    protected readonly token: string;
    protected readonly baseUrl: WsBaseURL;
    protected readonly role: string;
    protected readonly sessionId: string;
    protected readonly userPersistentId: string;

    protected constructor(config: WsClientConfig, token: string) {
        this.token = token, this.baseUrl = config.baseUrl;
        this.role = config.role;
        this.sessionId = ulid();
        this.userPersistentId = config.persistentId ?? "";
    }

    static async create<T extends BaseMtrWsClient>(
        this: new (params: WsClientConfig, token: string) => T,
        params: WsClientConfig,
    ): Promise<T> {
        const token = await WsAuth(params.baseUrl, {
            cpfCnpj: String(params.cpf),
            senha: String(params.senha),
            unidade: String(params.unidade),
        });
        return new this(params, token);
    }
}
