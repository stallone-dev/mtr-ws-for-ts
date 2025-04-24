/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { WsMethodContext } from "~type/method_config.type.ts";
import type { WsResponseModel } from "~type/ws_config.type.ts";
import { parseApiInput, parseApiResponse } from "~util/validate_schema.ts";

import {
    type TemplateRequestDTO,
    TemplateRequestSchema,
    type TemplateResponseDTO,
    TemplateResponseSchema,
} from "./template.dto.ts";

export { methodTemplate };

async function methodTemplate(
    ctx: WsMethodContext,
    anything: TemplateRequestDTO,
): Promise<TemplateResponseDTO> {
    const _input = parseApiInput(TemplateRequestSchema, anything);

    const endpoint = `${ctx.baseUrl}/[ENDPOINT]/${anything}`;
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Authorization": ctx.token,
            "Content-Type": "application/json",
        },
        // body: _input
    });

    const response_data = await response.json() as WsResponseModel<TemplateResponseDTO>;

    const result = parseApiResponse(TemplateResponseSchema, response_data, endpoint);

    return result;
}
