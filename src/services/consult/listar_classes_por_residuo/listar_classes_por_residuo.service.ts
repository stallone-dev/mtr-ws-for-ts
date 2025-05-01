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
    type ListarClassesPorResiduoRequestDTO,
    ListarClassesPorResiduoRequestSchema,
    type ListarClassesPorResiduoResponseDTO,
    ListarClassesPorResiduoResponseSchema,
} from "~service/consult/listar_classes_por_residuo/listar_classes_por_residuo.dto.ts";

export { listarClassesPorResiduoMethod };

async function listarClassesPorResiduoMethod(
    ctx: WsMethodContext,
    residuoId: ListarClassesPorResiduoRequestDTO,
): Promise<ListarClassesPorResiduoResponseDTO> {
    if (!ctx.baseUrl) throw new Error("Base URL ausente");
    if (!ctx.token) throw new Error("Token ausente");

    const input = parseApiInput(ListarClassesPorResiduoRequestSchema, residuoId);

    const endpoint = `${ctx.baseUrl}/retornaListaClassePorResiduo/${input.replace(/"/g, "")}`;
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

    const response_data = await response.json() as WsResponseModel<ListarClassesPorResiduoResponseDTO>;
    const result = parseApiResponse(ListarClassesPorResiduoResponseSchema, response_data, endpoint);

    return result;
}
