import { spy, stub } from "@testing/mock";
import { after, before, describe, it } from "@testing/bdd";
import { expect } from "@expect";
import { logger } from "~logger";

import type { AuthRequest } from "~service/auth/auth.dto.ts";
import { WsBaseURL } from "~type/ws_config.type.ts";
import { WsAuth } from "~service/main.service.ts";
import { instrumentationSupportForTests } from "../../instrument_support.ts";

import { receberLoteMTRMethod } from "~service/receive/receber_mtr/receber_mtr.service.ts";
import type { ReceberLoteMtrRequest } from "~service/receive/receber_mtr/receber_mtr.dto.ts";
import { consultarMTRMethod } from "~service/consult/consultar_mtr/consultar_mtr.service.ts";

describe("[RECEIVE] - Receber MTR", () => {
    const childStub = stub(logger, "getChild", () => logger);
    const infoSpy = spy(logger, "info");
    const baseUrl = WsBaseURL.SINIR;
    let token: string;

    before(async () => {
        const env = Deno.env.toObject();
        const login = {
            cpfCnpj: env.TEST_SINIR_CPF_ADMIN,
            senha: env.TEST_SINIR_PASSWORD,
            unidade: env.TEST_SINIR_UNIDADE,
        } as AuthRequest;

        token = await WsAuth(baseUrl, login, "TEST");
    });

    after(() => {
        // console.log(infoSpy.calls);
        childStub.restore();
        infoSpy.restore();
    });

    it("> Basic request", async () => {
        const consultTestFn = instrumentationSupportForTests(consultarMTRMethod);
        const receiveTestFn = instrumentationSupportForTests(receberLoteMTRMethod);

        const consult_result = await consultTestFn({ baseUrl, token }, "[[[MTR]]]");

        const receive_object: ReceberLoteMtrRequest = [{
            dataRecebimento: Date.now(),
            manNumero: consult_result.manNumero,
            nomeMotorista: "WELLINGTON DA SILVA",
            nomeResponsavelRecebimento: "Stallone L de Souza",
            placaVeiculo: "SIC9F94",
            observacoes: "Medição aferida em m³",
            listaManifestoResiduos: [{
                claCodigo: consult_result.listaManifestoResiduo[0].classe.claCodigo,
                marQuantidade: consult_result.listaManifestoResiduo[0].marQuantidade,
                marQuantidadeRecebida: 10,
                marJustificativa: "Medição aferida em m³",
                resCodigoIbama: consult_result.listaManifestoResiduo[0].residuo.resCodigoIbama,
                tiaCodigo: consult_result.listaManifestoResiduo[0].tipoAcondicionamento.tiaCodigo,
                tieCodigo: consult_result.listaManifestoResiduo[0].tipoEstado.tieCodigo,
                traCodigo: consult_result.listaManifestoResiduo[0].tratamento.traCodigo,
                uniCodigo: consult_result.listaManifestoResiduo[0].unidade.uniCodigo,
            }],
        }];

        const result = await receiveTestFn({ baseUrl, token }, receive_object);

        expect(result).toEqual(
            expect.arrayContaining(
                [expect.objectContaining({
                    restResponseValido: true,
                })],
            ),
        );
        expect(infoSpy.calls.length).toStrictEqual(6);
    });
});
