import { spy } from "@testing/mock";
import { after, before, describe, it } from "@testing/bdd";
import { expect } from "@expect";
import { logger } from "~logger";

import type { AuthRequestDTO } from "~service/auth/auth.dto.ts";
import { WsBaseURL } from "~type/ws_config.type.ts";
import { WsAuth } from "~service/main.service.ts";

describe("[AUTH]", () => {
    const infoSpy = spy(logger, "info");
    let loginMock = {
        cpfCnpj: "",
        senha: "",
        unidade: "",
    } as AuthRequestDTO;

    before(() => {
        const env = Deno.env.toObject();
        loginMock.cpfCnpj = env.SINIR_CPF_CNPJ;
        loginMock.senha = env.SINIR_PASSWORD;
        loginMock.unidade = env.SINIR_UNIDADE;
    });

    after(() => {
        loginMock = {} as AuthRequestDTO;
        infoSpy.restore();
    });

    it("> Basic auth", async () => {
        const result = await WsAuth(WsBaseURL.SINIR, loginMock);
        expect(result).toContain("Bearer");
        expect(infoSpy.calls.length).toStrictEqual(2);
    });

    it("> Invalid password", async () => {
        const localLogin = { ...loginMock, senha: "ABACAXI" };
        const result = WsAuth(WsBaseURL.SINIR, localLogin);
        await expect(result).rejects.toThrow();
        expect(infoSpy.calls.length).toStrictEqual(3);
    });
});
