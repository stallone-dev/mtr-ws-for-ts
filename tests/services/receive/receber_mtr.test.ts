import { spy } from "@testing/mock";
import { after, before, describe, it } from "@testing/bdd";
import { expect } from "@expect";
import { logger } from "~logger";

import type { AuthRequestDTO } from "~service/auth/auth.dto.ts";
import { WsBaseURL } from "~type/ws_config.type.ts";
import { WsAuth } from "~service/main.service.ts";
import { instrumentationSupportForTests } from "../../instrument_support.ts";

import { receberLoteMTRMethod } from "~service/receive/receber_mtr/receber_mtr.service.ts";
import type { ReceberLoteMTRDTO } from "~service/receive/receber_mtr/receber_mtr.dto.ts";

describe("[RECEIVE] - Receber MTR", () => {
    const infoSpy = spy(logger, "info");
    const baseUrl = WsBaseURL.SINIR;
    let token: string;

    before(async () => {
        const env = Deno.env.toObject();
        const login = {
            cpfCnpj: env.SINIR_CPF_ADMIN,
            senha: env.SINIR_PASSWORD,
            unidade: env.SINIR_UNIDADE,
        } as AuthRequestDTO;

        token = await WsAuth(baseUrl, login, "TEST");
    });

    after(() => {
        // console.log(infoSpy.calls);
        infoSpy.restore();
    });

    it("> Basic request", async () => {
        const receiveTestFn = instrumentationSupportForTests(receberLoteMTRMethod);

        const receive_object: ReceberLoteMTRDTO = [{
            dataRecebimento: Date.now(),
            manNumero: consult_result.manNumero,
            nomeMotorista: "WELLINGTON DA SILVA",
            nomeResponsavelRecebimento: "Stallone L de Souza",
            placaVeiculo: "SIC9F94",
            observacoes: "Medição aferida em m³",
            listaManifestoResiduos: [{
                claCodigo: consult_result.listaManifestoResiduo[0].classe.claCodigo,
                marQuantidade: consult_result.listaManifestoResiduo[0].marQuantidade,
                marQuantidadeRecebida: 6,
                marJustificativa: "Medição aferida em m³",
                resCodigoIbama: consult_result.listaManifestoResiduo[0].residuo.resCodigoIbama,
                tiaCodigo: consult_result.listaManifestoResiduo[0].tipoAcondicionamento.tiaCodigo,
                tieCodigo: consult_result.listaManifestoResiduo[0].tipoEstado.tieCodigo,
                traCodigo: consult_result.listaManifestoResiduo[0].tratamento.traCodigo,
                uniCodigo: consult_result.listaManifestoResiduo[0].unidade.uniCodigo,
            }],
        }];

        const result = await receiveTestFn({ baseUrl, token }, receive_object);

        console.log(result);

        expect(result).toEqual(
            expect.arrayContaining(
                [expect.objectContaining({
                    traCodigo: 61,
                    traDescricao: "Triagem e Transbordo",
                })],
            ),
        );
        expect(infoSpy.calls.length).toStrictEqual(4);
    });
});
