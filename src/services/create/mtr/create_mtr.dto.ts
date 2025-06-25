/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { z } from "@zod";

export { type GerarLoteMtrRequest, GerarLoteMtrRequestSchema, type GerarLoteMtrResponse, GerarLoteMtrResponseSchema };

type GerarLoteMtrRequest = z.infer<typeof GerarLoteMtrRequestSchema>;
type GerarLoteMtrResponse = z.infer<typeof GerarLoteMtrResponseSchema>;

const GerarLoteMtrResponseSchema = z.array(
    z.object({
        restResponseValido: z.boolean(),
        restResponseMensagem: z.string(),
        codigoGerado: z.number(),
        manifestoNumeroEstadual: z.string().or(z.null()),
        manifestoNumeroNacional: z.number(),
        possuiArmazenamentoTemporario: z.boolean().or(z.null()),
        armazenadorTemporario: z.object({
            unidade: z.number(),
            cpfCnpj: z.string(),
            restResponseValido: z.boolean(),
            restResponseMensage: z.string(),
        }).or(z.null()),
        nomeMotorista: z.string().or(z.null()),
        placaVeiculo: z.string().or(z.null()),
        dataExpedicao: z.number().or(z.null()),
        destinador: z.object({
            unidade: z.number(),
            cpfCnpj: z.string(),
            restResponseValido: z.boolean(),
            restResponseMensage: z.string(),
        }).or(z.null()),
        gerador: z.object({
            unidade: z.number(),
            cpfCnpj: z.string(),
            restResponseValido: z.boolean(),
            restResponseMensage: z.string(),
        }).or(z.null()),
        ufOrigemMtr: z.string().or(z.null()),
        tipoManifesto: z.number().or(z.null()),
        observacoes: z.string(),
        erroNacional: z.boolean(),
        mensagemErroNacional: z.string().or(z.null()),
        listaManifestoResiduos: z.array(
            z.object({
                restResponseValido: z.boolean(),
                restResponseMensagem: z.string(),
                codigoGerado: z.string().or(z.null()),
                manCodigo: z.string().or(z.null()),
                resCodigoIbama: z.string(),
                resCodigoIbamaNovo: z.string().or(z.null()),
                traCodigo: z.number(),
                traCodigoNovo: z.number().or(z.null()),
                uniCodigo: z.number(),
                tieCodigo: z.number(),
                tiaCodigo: z.number(),
                claCodigo: z.number(),
                marQuantidade: z.number(),
                marQuantidadeRecebida: z.number().or(z.null()),
                marDensidade: z.number().or(z.null()),
                marNumeroONU: z.string().or(z.null()),
                marClasseRisco: z.string().or(z.null()),
                marNomeEmbarque: z.string().or(z.null()),
                marGrupoEmbalagem: z.string().or(z.null()),
                greCodigo: z.number().or(z.null()),
                marJustificativa: z.string(),
                marCodigoInterno: z.string().or(z.null()),
                marDescricaoInterna: z.string().or(z.null()),
                observacoes: z.string().or(z.null()),
            }),
        ).nonempty(),
    }),
).nonempty();

const GerarLoteMtrRequestSchema = z.array(
    z.object({
        simCodigo: z.number().optional(),
        tipoManifesto: z.number().optional(),
        nomeResponsavel: z.string(),
        dataExpedicao: z.number(),
        nomeMotorista: z.string().transform((e) => e.toUpperCase()).optional(),
        placaVeiculo: z.string()
            .refine(
                (e) => !e.includes("-"),
                { message: "Não deve conter Hifen", path: ["placaVeiculo"] },
            )
            .refine(
                (e) => e.length > 7,
                { message: "Máximo de 7 caracteres", path: ["placaVeiculo"] },
            )
            .transform((e) => e.toUpperCase()).optional(),
        observacoes: z.string(),

        gerador: z.object({
            unidade: z.number(),
            cpfCnpj: z.string(),
        }).optional(),

        transportador: z.object({
            unidade: z.number(),
            cpfCnpj: z.string(),
        }),
        destinador: z.object({
            unidade: z.number(),
            cpfCnpj: z.string(),
        }),
        armazenadorTemporario: z.object({
            unidade: z.number(),
            cpfCnpj: z.string(),
        }).optional(),
        possuiArmazenamentoTemporario: z.boolean(),

        listaManifestoResiduos: z.array(
            z.object({
                resCodigoIbama: z.string(),
                marQuantidade: z.number(),
                traCodigo: z.number(),
                uniCodigo: z.number(),
                tieCodigo: z.number(),
                tiaCodigo: z.number(),
                claCodigo: z.number(),
                marDensidade: z.number().optional(),
                marNumeroONU: z.string().optional(),
                marClasseRisco: z.string().optional(),
                marNomeEmbarque: z.string().optional(),
                greCodigo: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
                marDescricaoInterna: z.string().optional(),
                marCodigoInterno: z.string().optional(),
                observacoes: z.string(),
            }).refine((e) => {
                const grupoPerigosos = ["*", "200132", "Grup A", "Grup B", "Grup C", "Grup D", "Grup E"];
                if (grupoPerigosos.map((i) => e.resCodigoIbama.includes(i)).some((k) => k === true)) {
                    const hasMarNumeroONU = typeof e.marNumeroONU === "string";
                    const hasMarClasseRisco = typeof e.marClasseRisco === "string";
                    const hasMarNomeEmbarque = typeof e.marNomeEmbarque === "string";
                    const hasGreCodigo = typeof e.greCodigo === "number";

                    if (!hasMarNumeroONU || !hasMarClasseRisco || !hasMarNomeEmbarque || !hasGreCodigo) {
                        return false;
                    }
                }
                return true;
            }, {
                message:
                    "Os elementos vinculados aos resíduos perigosos devem estar preenchidos para este código IBAMA",
                path: ["resCodigoIbama", "marNumeroOnu", "marClasseRisco", "marNomeEmbarque", "greCodigo"],
            }).refine((e) => {
                const grupoEspecial = ["200132", "Grup A", "Grup B", "Grup C", "Grup D", "Grup E"];
                if (grupoEspecial.map((i) => e.resCodigoIbama.includes(i)).some((k) => k === true)) {
                    const unidadesEspeciais = [2, 21];
                    if (!unidadesEspeciais.includes(e.uniCodigo)) {
                        return false;
                    }
                }
                return true;
            }, {
                message: "O grupo especial de resíduos RSS devem possuir as unidades 2 (Kg) ou 21 (Litro)",
                path: ["uniCodigo", "resCodigoIbama"],
            }).refine((e) => {
                const unidadesComDensidade = [20, 21];
                if (unidadesComDensidade.includes(e.uniCodigo)) {
                    return typeof e.marDensidade === "number";
                }
                return true;
            }, {
                message: "As unidades de medida 20 (m³) e 21 (Litro) devem possuir densidade",
                path: ["marDensidade", "uniCodigo"],
            }).refine((e) => {
                return !(e.resCodigoIbama === "200304" && e.tieCodigo !== 2);
            }, {
                message: "Para o resíduo especial 200304, é obrigatório o estado físico 2 (Líquido)",
                path: ["tieCodigo", "resCodigoIbama"],
            }).refine((e) => {
                return !(e.resCodigoIbama === "200121(*)" && e.uniCodigo !== 1);
            }, {
                message: "Para o resíduo especial 200121(*) é obrigatório a unidade de medida 1 (un)",
                path: ["uniCodigo", "resCodigoIbama"],
            }),
        ).nonempty(),
    }),
).nonempty();
