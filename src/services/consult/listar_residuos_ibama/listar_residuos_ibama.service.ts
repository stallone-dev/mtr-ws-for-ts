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
    type ListarResiduosDTO,
    ListarResiduosSchema,
} from "~service/consult/listar_residuos_ibama/listar_residuos_ibama.dto.ts";

export { listarResiduosMethod };

async function listarResiduosMethod(
    ctx: WsMethodContext,
): Promise<ListarResiduosDTO> {
    const endpoint = `${ctx.baseUrl}/retornaListaResiduo`;
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Authorization": ctx.token,
            "Content-Type": "application/json",
        },
    });

    const response_data = await response.json() as WsResponseModel<ListarResiduosDTO>;

    const result = parseApiResponse(ListarResiduosSchema, response_data, endpoint);

    return result;
}
