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
    type DownloadCDFRequestDTO,
    DownloadCDFRequestSchema,
    type DownloadCDFResponseDTO,
    DownloadCDFResponseJsonSchema,
    DownloadCDFResponseSchema,
} from "~service/download/cdf/download_cdf.dto.ts";

export { downloadCDFMethod };

async function downloadCDFMethod(
    ctx: WsMethodContext,
    params: DownloadCDFRequestDTO,
): Promise<DownloadCDFResponseDTO> {
    if (!ctx.baseUrl) throw new Error("Base URL ausente");
    if (!ctx.token) throw new Error("Token ausente");

    parseApiInput(DownloadCDFRequestSchema, params);

    const endpoint = `${ctx.baseUrl}/retornaListaAcondicionamentoPorEstadoFisico/${params.cdfId}`;
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

    const cloneResponse = response.clone();

    const response_json = await cloneResponse.json() as WsResponseModel<DownloadCDFResponseDTO>;
    parseApiResponse(DownloadCDFResponseJsonSchema, response_json, endpoint);

    const response_parsed: WsResponseModel<DownloadCDFResponseDTO> = {
        ...response_json,
        objetoResposta: await response.arrayBuffer(),
    };

    const result = parseApiResponse(DownloadCDFResponseSchema, response_parsed, endpoint);

    if (params.destinationPath) {
        await Deno.writeFile(params.destinationPath, new Uint8Array(result));
    }

    return result;
}
