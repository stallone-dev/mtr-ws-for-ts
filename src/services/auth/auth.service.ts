/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { WsMethodContext } from "~type/method_config.type.ts";
import { parseApiInput, parseApiResponse } from "~util/validate_schema.ts";
import { type AuthRequestDTO, AuthRequestSchema, type AuthResponseDTO, AuthResponseSchema } from "./auth.dto.ts";

export { authMethod };

async function authMethod(
    ctx: WsMethodContext,
    { cpfCnpj, senha, unidade }: AuthRequestDTO,
): Promise<AuthResponseDTO> {
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
        const errorData = await response.json();
        throw new Error(
            `Erro na requisição para ${endpoint}: Status ${response.status} - ${response.statusText}. Resposta da API: ${
                JSON.stringify(errorData)
            }`,
        );
    }

    const data = await response.json();
    const result = parseApiResponse(AuthResponseSchema, data, endpoint);

    return result;
}
