/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { z } from "@zod";

export { type DownloadMTRRequestDTO, DownloadMTRRequestSchema, type DownloadMTRResponseDTO, DownloadMTRResponseSchema };

type DownloadMTRResponseDTO = z.infer<
    typeof DownloadMTRResponseSchema
>;
type DownloadMTRRequestDTO = z.infer<
    typeof DownloadMTRRequestSchema
>;

const DownloadMTRResponseSchema = z.instanceof(ArrayBuffer, {
    message: "Somente ArrayBuffer",
}).refine((e) => e.byteLength > 0, {
    message: "Nenhum byte recebido",
});

const DownloadMTRRequestSchema = z.object({
    mtrId: z.string().min(5),
    destinationFolder: z.string().min(1).nonempty().optional(),
});
