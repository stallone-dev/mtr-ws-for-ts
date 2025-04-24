/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { z } from "@zod";

export { type TemplateRequestDTO, TemplateRequestSchema, type TemplateResponseDTO, TemplateResponseSchema };

type TemplateResponseDTO = z.infer<typeof TemplateResponseSchema>;
type TemplateRequestDTO = z.infer<typeof TemplateRequestSchema>;

const TemplateResponseSchema = z.object({
    success: z.boolean(),
    data: z.unknown(),
});
const TemplateRequestSchema = z.unknown();
