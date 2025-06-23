import { spy, stub } from "@testing/mock";
import { after, before, describe, it } from "@testing/bdd";
import { expect } from "@expect";
import { logger } from "~logger";

import type { AuthRequest } from "~service/auth/auth.dto.ts";
import { WsBaseURL } from "~type/ws_config.type.ts";
import { WsAuth } from "~service/main.service.ts";
import { instrumentationSupportForTests } from "../../instrument_support.ts";
import { consultarMTRMethod } from "~service/consult/consultar_mtr/consultar_mtr.service.ts";

describe("[CONSULT] - Consultar MTR típica", () => {
    const childStub = stub(logger, "getChild", () => logger);
    const infoSpy = spy(logger, "info");
    const baseUrl = WsBaseURL.SINIR;
    let token: string;

    before(async () => {
        const env = Deno.env.toObject();
        const login = {
            cpfCnpj: env.SINIR_CPF_ADMIN,
            senha: env.SINIR_PASSWORD,
            unidade: env.SINIR_UNIDADE,
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

        const result = await consultTestFn({ baseUrl, token }, "251025756462");

        expect(result).toEqual(
            expect.objectContaining({
                estado: { estCodigo: 15, estAbreviacao: "PB" },
            }),
        );
        expect(infoSpy.calls.length).toStrictEqual(4);
    });

    it("> Invalid token", async () => {
        const consultTestFn = instrumentationSupportForTests(consultarMTRMethod);

        await expect(consultTestFn({ baseUrl, token: "INVALID_TOKEN" }, "251025756462"))
            .rejects
            .toThrow(/Unauthorized/);
        expect(infoSpy.calls.length).toStrictEqual(5);
    });

    it("> Invalid URL", async () => {
        const consultTestFn = instrumentationSupportForTests(consultarMTRMethod);

        await expect(consultTestFn({ baseUrl: "example.com" as WsBaseURL, token }, "251025756462"))
            .rejects
            .toThrow(/Invalid URL/);
        expect(infoSpy.calls.length).toStrictEqual(6);
    });
});
