/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { WsMethodContext } from "~type/method_config.type.ts";
import { parseApiInput, parseApiResponse } from "~util/validate_schema.ts";

import { type AuthRequestDTO, AuthRequestSchema, type AuthResponseDTO, AuthResponseSchema } from "./auth.dto.ts";
import type { WsResponseModel } from "~type/ws_config.type.ts";

export { authMethod };

async function authMethod(
    ctx: WsMethodContext,
    { cpfCnpj, senha, unidade }: AuthRequestDTO,
): Promise<AuthResponseDTO> {
    if (!ctx.baseUrl) throw new Error("Base URL ausente");
    if (!ctx.token) throw new Error("Token ausente");

    const input = parseApiInput(AuthRequestSchema, { cpfCnpj, senha, unidade });

    const endpoint = `${ctx.baseUrl}/gettoken/`;
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Authorization": ctx.token,
            "Content-Type": "application/json",
        },
        body: input,
    });

    if (!response.ok) {
        const _ = await response.text();
        throw new Error(`HTTP ${response.status} @ ${endpoint}: ${response.statusText}`);
    }

    const response_data = await response.json() as WsResponseModel<AuthResponseDTO>;
    const result = parseApiResponse(AuthResponseSchema, response_data, endpoint);

    return result;
}
