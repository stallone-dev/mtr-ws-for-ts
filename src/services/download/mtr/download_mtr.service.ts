/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { WsMethodContext } from "~type/method_config.type.ts";
import type { WsResponseModel } from "~type/ws_config.type.ts";
import { join } from "@path";
import { parseApiInput, parseApiResponse } from "~util/validate_schema.ts";

import {
    type DownloadMTRRequestDTO,
    DownloadMTRRequestSchema,
    type DownloadMTRResponseDTO,
    DownloadMTRResponseSchema,
} from "~service/download/mtr/download_mtr.dto.ts";

export { downloadMTRMethod };

async function downloadMTRMethod(
    ctx: WsMethodContext,
    params: DownloadMTRRequestDTO,
): Promise<DownloadMTRResponseDTO> {
    if (!ctx.baseUrl) throw new Error("Base URL ausente");
    if (!ctx.token) throw new Error("Token ausente");

    parseApiInput(DownloadMTRRequestSchema, params);

    const endpoint = `${ctx.baseUrl}/downloadManifesto/${params.mtrId}`;
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Authorization": ctx.token,
            "Accept": "application/pdf",
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const _ = await response.text();
        throw new Error(
            `HTTP ${response.status} @ ${endpoint}: ${response.statusText}`,
        );
    }

    const response_parsed: WsResponseModel<DownloadMTRResponseDTO> = {
        erro: false,
        mensagem: "",
        totalRecords: 1,
        objetoResposta: await response.arrayBuffer(),
    };

    const result = parseApiResponse(
        DownloadMTRResponseSchema,
        response_parsed,
        endpoint,
    );

    if (params.destinationFolder) {
        await Deno.writeFile(
            join(
                params.destinationFolder,
                createMTRFileName(params.mtrId),
            ),
            new Uint8Array(result),
        );
    }

    return result;
}

function createMTRFileName(cdfId: string): string {
    const date = new Date();
    const monthRef = date.getUTCMonth() + 1;
    const dayRef = date.getUTCDate();

    const year = date.getUTCFullYear();
    const month = `${monthRef < 10 ? "0" : ""}${monthRef}`;
    const day = `${dayRef < 10 ? "0" : ""}${dayRef}`;

    return `${year}_${month}_${day}_MTR_${cdfId}.pdf`;
}
