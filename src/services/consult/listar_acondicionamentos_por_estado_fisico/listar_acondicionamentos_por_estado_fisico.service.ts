/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { WsMethodContext, WsResponseModel } from "~type/ws_config.type.ts";
import { parseApiInput, parseApiResponse } from "~util/validate_schema.ts";

import {
    type ListarAcondicionamentosPorEstadoFisicoRequest,
    ListarAcondicionamentosPorEstadoFisicoRequestSchema,
    type ListarAcondicionamentosPorEstadoFisicoResponse,
    ListarAcondicionamentosPorEstadoFisicoResponseSchema,
} from "~service/consult/listar_acondicionamentos_por_estado_fisico/listar_acondicionamentos_por_estado_fisico.dto.ts";

export { listarAcondicionamentosPorEstadoFisicoMethod };

async function listarAcondicionamentosPorEstadoFisicoMethod(
    ctx: WsMethodContext,
    estadoId: ListarAcondicionamentosPorEstadoFisicoRequest,
): Promise<ListarAcondicionamentosPorEstadoFisicoResponse> {
    if (!ctx.baseUrl) throw new Error("Base URL ausente");
    if (!ctx.token) throw new Error("Token ausente");

    const input = parseApiInput(ListarAcondicionamentosPorEstadoFisicoRequestSchema, estadoId);

    const endpoint = `${ctx.baseUrl}/retornaListaAcondicionamentoPorEstadoFisico/${input}`;
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

    const response_data = await response.json() as WsResponseModel<ListarAcondicionamentosPorEstadoFisicoResponse>;

    const result = parseApiResponse(ListarAcondicionamentosPorEstadoFisicoResponseSchema, response_data, endpoint);

    return result;
}
