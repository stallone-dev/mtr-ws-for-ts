import { spy, stub } from "@testing/mock";
import { after, before, describe, it } from "@testing/bdd";
import { expect } from "@expect";
import { logger } from "~logger";

import type { AuthRequest } from "~service/auth/auth.dto.ts";
import { WsBaseURL } from "~type/ws_config.type.ts";
import { WsAuth } from "~service/main.service.ts";
import { instrumentationSupportForTests } from "../../instrument_support.ts";

import type { GerarLoteMtrRequest } from "~service/create/mtr/create_mtr.dto.ts";
import { gerarLoteMtrMethod } from "~service/create/mtr/create_mtr.service.ts";

describe("[CREATE] - Gerar MTRs", () => {
    const env = Deno.env.toObject();
    const childStub = stub(logger, "getChild", () => logger);
    const infoSpy = spy(logger, "info");
    const baseUrl = WsBaseURL.SINIR;
    let token: string;

    before(async () => {
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
        const testFn = instrumentationSupportForTests(gerarLoteMtrMethod);

        const create_mtr_config: GerarLoteMtrRequest = [{
            dataExpedicao: Date.now(),
            observacoes: "",
            transportador: {
                unidade: Number(env.TEST_SINIR_TRANSPORTADOR_UNIDADE),
                cpfCnpj: String(env.TEST_SINIR_TRANSPORTADOR_CNPJ),
            },
            destinador: {
                unidade: Number(env.TEST_SINIR_DESTINADOR_UNIDADE),
                cpfCnpj: String(env.TEST_SINIR_DESTINADOR_CNPJ),
            },
            nomeResponsavel: "",
            possuiArmazenamentoTemporario: false,
            listaManifestoResiduos: [{
                claCodigo: 11,
                marQuantidade: 1,
                resCodigoIbama: "170107",
                tieCodigo: 4,
                uniCodigo: 3,
                tiaCodigo: 13,
                traCodigo: 43,
                observacoes: "",
            }],
        }];

        const result = await testFn({ baseUrl, token }, create_mtr_config);

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
