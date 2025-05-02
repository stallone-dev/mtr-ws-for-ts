import { spy } from "@testing/mock";
import { after, before, describe, it } from "@testing/bdd";
import { expect } from "@expect";
import { logger } from "~logger";

import type { AuthRequestDTO } from "~service/auth/auth.dto.ts";
import { WsBaseURL } from "~type/ws_config.type.ts";
import { WsAuth } from "~service/main.service.ts";
import { instrumentationSupportForTests } from "../../instrument_support.ts";

import { downloadCDFMethod } from "~service/download/cdf/download_cdf.service.ts";

describe("[DOWNLOAD] - Download CDF", () => {
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
        const consultTestFn = instrumentationSupportForTests(downloadCDFMethod);

        const result = await consultTestFn({ baseUrl, token }, {
            cdfId: "020404",
            destinationPath: "./foo.pdf",
        });
        expect(result).not.toThrow();
        expect(infoSpy.calls.length).toStrictEqual(4);
    });

    it("> Invalid token", async () => {
        const consultTestFn = instrumentationSupportForTests(downloadCDFMethod);

        await expect(consultTestFn({ baseUrl, token: "INVALID_TOKEN" }, {
            cdfId: "020404",
            destinationPath: "./foo",
        }))
            .rejects
            .toThrow(/Unauthorized/);
        expect(infoSpy.calls.length).toStrictEqual(5);
    });

    it("> Invalid URL", async () => {
        const consultTestFn = instrumentationSupportForTests(downloadCDFMethod);

        await expect(consultTestFn({ baseUrl: "example.com" as WsBaseURL, token }, {
            cdfId: "020404",
            destinationPath: "./foo",
        }))
            .rejects
            .toThrow(/Invalid URL/);
        expect(infoSpy.calls.length).toStrictEqual(6);
    });
});
