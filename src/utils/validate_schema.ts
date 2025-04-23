/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { ZodSchema } from "@zod";

export { parseApiInput, parseApiResponse };

function parseApiResponse<T>(
    schema: ZodSchema<T>,
    data: unknown,
    endpoint: string,
): T {
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
        throw new Error(
            `Resposta inválida da API: [${endpoint}]: ${parsed.error.message}. Dados recebidos: ${
                JSON.stringify(data)
            }`,
        );
    }

    return JSON.parse(parsed.data as string);
}

function parseApiInput<T>(
    schema: ZodSchema<T>,
    data: unknown,
): string {
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
        throw new Error(
            `Input inválido para API: ${parsed.error.message}. Input: ${JSON.stringify(data)}`,
        );
    }

    return JSON.stringify(parsed.data);
}
