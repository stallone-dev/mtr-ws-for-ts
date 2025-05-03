/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { z } from "@zod";

export { type DownloadCDFRequestDTO, DownloadCDFRequestSchema, type DownloadCDFResponseDTO, DownloadCDFResponseSchema };

type DownloadCDFResponseDTO = z.infer<
    typeof DownloadCDFResponseSchema
>;
type DownloadCDFRequestDTO = z.infer<
    typeof DownloadCDFRequestSchema
>;

const DownloadCDFResponseSchema = z.instanceof(ArrayBuffer, {
    message: "Somente ArrayBuffer",
}).refine((e) => e.byteLength > 0, {
    message: "Nenhum byte recebido",
});

const DownloadCDFRequestSchema = z.object({
    cdfId: z.string().min(5),
    destinationFolder: z.string().min(1).nonempty().optional(),
});
