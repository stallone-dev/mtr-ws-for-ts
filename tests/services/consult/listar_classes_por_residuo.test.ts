import { spy, stub } from "@testing/mock";
import { after, before, describe, it } from "@testing/bdd";
import { expect } from "@expect";
import { logger } from "~logger";

import type { AuthRequest } from "~service/auth/auth.dto.ts";
import { WsBaseURL } from "~type/ws_config.type.ts";
import { WsAuth } from "~service/main.service.ts";
import { instrumentationSupportForTests } from "../../instrument_support.ts";

import { listarClassesPorResiduoMethod } from "~service/consult/listar_classes_por_residuo/listar_classes_por_residuo.service.ts";

describe("[CONSULT] - Listar classes por resíduo", () => {
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
        const consultTestFn = instrumentationSupportForTests(listarClassesPorResiduoMethod);

        const result = await consultTestFn({ baseUrl, token }, "020404");
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    claCodigo: 43,
                    claDescricao: "CLASSE II A",
                }),
            ]),
        );
        expect(infoSpy.calls.length).toStrictEqual(4);
    });

    it("> Invalid token", async () => {
        const consultTestFn = instrumentationSupportForTests(listarClassesPorResiduoMethod);

        await expect(consultTestFn({ baseUrl, token: "INVALID_TOKEN" }, "020404"))
            .rejects
            .toThrow(/Unauthorized/);
        expect(infoSpy.calls.length).toStrictEqual(5);
    });

    it("> Invalid URL", async () => {
        const consultTestFn = instrumentationSupportForTests(listarClassesPorResiduoMethod);

        await expect(consultTestFn({ baseUrl: "example.com" as WsBaseURL, token }, "020404"))
            .rejects
            .toThrow(/Invalid URL/);
        expect(infoSpy.calls.length).toStrictEqual(6);
    });
});
