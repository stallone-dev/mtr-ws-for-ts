/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { z } from "@zod";

export { type ReceberLoteMTRDTO, ReceberLoteMTRSchema };

type ReceberLoteMTRDTO = z.infer<typeof ReceberLoteMTRSchema>;

const ReceberLoteMTRSchema = z.array(
    z.object({
        manNumero: z.string(),
        dataRecebimento: z.number(),
        nomeMotorista: z.string().transform((e) => e.toUpperCase()),
        placaVeiculo: z.string().transform((e) => e.toUpperCase()),
        nomeResponsavelRecebimento: z.string(),
        observacoes: z.string(),
        listaManifestoResiduos: z.array(
            z.object({
                resCodigoIbama: z.string(),
                resCodigoIbamaNovo: z.string().optional(),
                marQuantidade: z.number(),
                marQuantidadeRecebida: z.number(),
                traCodigo: z.number(),
                traCodigoNovo: z.number().optional(),
                uniCodigo: z.number(),
                marJustificativa: z.string(),
                tieCodigo: z.number(),
                tiaCodigo: z.number(),
                claCodigo: z.number(),
                marDensidade: z.number().optional(),
                marNumeroONU: z.string().optional(),
                marClasseRisco: z.string().optional(),
                marNomeEmbarque: z.string().optional(),
                greCodigo: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
            }),
        ).nonempty(),
    }),
).nonempty();
