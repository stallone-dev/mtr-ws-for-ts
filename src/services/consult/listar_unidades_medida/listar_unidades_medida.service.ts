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
    type ListarUnidadesMedidaDTO,
    ListarUnidadesMedidaSchema,
} from "~service/consult/listar_unidades_medida/listar_unidades_medida.dto.ts";

export { listarUnidadesMedidaMethod as listarClassesMethod };

async function listarUnidadesMedidaMethod(
    ctx: WsMethodContext,
): Promise<ListarUnidadesMedidaDTO> {
    if (!ctx.baseUrl) throw new Error("Base URL ausente");
    if (!ctx.token) throw new Error("Token ausente");

    const endpoint = `${ctx.baseUrl}/retornaListaUnidade`;
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Authorization": ctx.token,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const _ = await response.text();
        throw new Error(`HTTP ${response.status} @ ${endpoint}: ${response.statusText}`);
    }

    const response_data = await response.json() as WsResponseModel<ListarUnidadesMedidaDTO>;
    const result = parseApiResponse(ListarUnidadesMedidaSchema, response_data, endpoint);

    return result;
}
