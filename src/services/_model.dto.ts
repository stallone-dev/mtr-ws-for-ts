// Exemplo de modelo de DTO geral para lib
import { z } from "@zod";

export { responseSchema, type responseTypeDTO };

type responseTypeDTO = z.infer<typeof responseSchema>;

const responseSchema = z.object({
    id: z.string(),
    description: z.string(),
    status: z.string(),
});
