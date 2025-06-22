/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { z } from "@zod";

export {
    type ListarAcondicionamentosPorEstadoFisicoRequest,
    ListarAcondicionamentosPorEstadoFisicoRequestSchema,
    type ListarAcondicionamentosPorEstadoFisicoResponse,
    ListarAcondicionamentosPorEstadoFisicoResponseSchema,
};

type ListarAcondicionamentosPorEstadoFisicoResponse = z.infer<
    typeof ListarAcondicionamentosPorEstadoFisicoResponseSchema
>;
type ListarAcondicionamentosPorEstadoFisicoRequest = z.infer<
    typeof ListarAcondicionamentosPorEstadoFisicoRequestSchema
>;

const ListarAcondicionamentosPorEstadoFisicoResponseSchema = z.array(
    z.object({
        tiaCodigo: z.number().min(1),
        tiaDescricao: z.string(),
    }),
).nonempty();

const ListarAcondicionamentosPorEstadoFisicoRequestSchema = z.number().min(1);
