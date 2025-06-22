/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { z } from "@zod";

export { type AuthRequest, AuthRequestSchema, type AuthResponse, AuthResponseSchema };

type AuthResponse = z.infer<typeof AuthResponseSchema>;
type AuthRequest = z.infer<typeof AuthRequestSchema>;

const AuthResponseSchema = z.string().startsWith("Bearer ");

const AuthRequestSchema = z.object({
    cpfCnpj: z
        .string({ required_error: "CPF/CNPJ deve ser somente números" })
        .regex(/^(\d{11}|\d{14})$/),
    senha: z.string(),
    unidade: z.string().regex(/^[0-9]+$/),
});
