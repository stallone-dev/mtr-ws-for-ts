/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { z } from "@zod";

export { type TemplateResponseDTO, TemplateResponseSchema };

type TemplateResponseDTO = z.infer<typeof TemplateResponseSchema>;

const TemplateResponseSchema = z.object({
    status: z.string().min(1, "Status is empty"),
    data: z.unknown(),
});
