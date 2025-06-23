import { spy, stub } from "@testing/mock";
import { after, before, describe, it } from "@testing/bdd";
import { expect } from "@expect";
import { logger } from "~logger";

import type { AuthRequest } from "~service/auth/auth.dto.ts";
import { WsBaseURL } from "~type/ws_config.type.ts";
import { WsAuth } from "~service/main.service.ts";
import { instrumentationSupportForTests } from "../../instrument_support.ts";

import { listarClassesMethod } from "~service/consult/listar_classes/listar_classes.service.ts";

describe("[CONSULT] - Listar classes", () => {
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
        const consultTestFn = instrumentationSupportForTests(listarClassesMethod);

        const result = await consultTestFn({ baseUrl, token });
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    claCodigo: 32,
                    claDescricao: "GRUPO B (RSS)",
                }),
            ]),
        );
        expect(infoSpy.calls.length).toStrictEqual(4);
    });

    it("> Invalid token", async () => {
        const consultTestFn = instrumentationSupportForTests(listarClassesMethod);

        await expect(consultTestFn({ baseUrl, token: "INVALID_TOKEN" }))
            .rejects
            .toThrow(/Unauthorized/);
        expect(infoSpy.calls.length).toStrictEqual(5);
    });

    it("> Invalid URL", async () => {
        const consultTestFn = instrumentationSupportForTests(listarClassesMethod);

        await expect(consultTestFn({ baseUrl: "example.com" as WsBaseURL, token }))
            .rejects
            .toThrow(/Invalid URL/);
        expect(infoSpy.calls.length).toStrictEqual(6);
    });
});
