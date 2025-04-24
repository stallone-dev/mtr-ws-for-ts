/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { WsMethodContext } from "~type/method_config.type.ts";
import type { WsResponseModel } from "~type/ws_config.type.ts";
import { parseApiResponse } from "~util/validate_schema.ts";

import {
    type ListarEstadosFisicosDTO,
    ListarEstadosFisicosSchema,
} from "~service/consult/listar_estados_fisicos/listar_estados_fisicos.dto.ts";

export { listarEstadosFisicosMethod };

async function listarEstadosFisicosMethod(
    ctx: WsMethodContext,
): Promise<ListarEstadosFisicosDTO> {
    const endpoint = `${ctx.baseUrl}/retornaListaEstadoFisico`;
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Authorization": ctx.token,
            "Content-Type": "application/json",
        },
    });

    const response_data = await response.json() as WsResponseModel<ListarEstadosFisicosDTO>;

    const result = parseApiResponse(ListarEstadosFisicosSchema, response_data, endpoint);

    return result;
}
