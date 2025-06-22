/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { z } from "@zod";

export {
    type ListarClassesPorResiduoRequest,
    ListarClassesPorResiduoRequestSchema,
    type ListarClassesPorResiduoResponse,
    ListarClassesPorResiduoResponseSchema,
};

type ListarClassesPorResiduoResponse = z.infer<typeof ListarClassesPorResiduoResponseSchema>;
type ListarClassesPorResiduoRequest = z.infer<typeof ListarClassesPorResiduoRequestSchema>;

const ListarClassesPorResiduoResponseSchema = z.array(
    z.object({
        claCodigo: z.number().min(1),
        claDescricao: z.string(),
    }),
).nonempty();

const ListarClassesPorResiduoRequestSchema = z.string().min(6);
