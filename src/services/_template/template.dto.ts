// Create by Stallone L. de Souza (@stallone-dev) - 2025 - License: MPL-2.0

import { z } from "@zod";

export { type TemplateResponseDTO, TemplateResponseSchema };

type TemplateResponseDTO = z.infer<typeof TemplateResponseSchema>;

const TemplateResponseSchema = z.object({
    status: z.string().min(1, "Status is empty"),
    data: z.unknown(),
});
