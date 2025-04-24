/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { WsMethodContext } from "~type/method_config.type.ts";
import { TemplateRequestSchema, type TemplateResponseDTO, TemplateResponseSchema } from "./template.dto.ts";
import { parseApiInput, parseApiResponse } from "~util/validate_schema.ts";

export { methodTemplate };

async function methodTemplate(
    ctx: WsMethodContext,
    anything: string,
): Promise<TemplateResponseDTO> {
    const _input = parseApiInput(TemplateRequestSchema, anything);

    const endpoint = `${ctx.baseUrl}/[ENDPOINT]/${anything}`;
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${ctx.token}`,
            "Content-Type": "application/json",
        },
        // body: _input
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            `Erro na requisição para ${endpoint}: Status ${response.status} - ${response.statusText}. Resposta da API: ${
                JSON.stringify(errorData)
            }`,
        );
    }

    const response_data = await response.json();
    const result = parseApiResponse(TemplateResponseSchema, response_data, endpoint);

    return result;
}
