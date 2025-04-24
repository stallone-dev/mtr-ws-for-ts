/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { z } from "@zod";

export { type ListarEstadosFisicosDTO, ListarEstadosFisicosSchema };

type ListarEstadosFisicosDTO = z.infer<typeof ListarEstadosFisicosSchema>;

const ListarEstadosFisicosSchema = z.array(
    z.object({
        tieCodigo: z.number().min(1),
        tieDescricao: z.string(),
    }),
).nonempty();
