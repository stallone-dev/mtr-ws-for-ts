import { after, before, describe, it } from "@testing";
import { expect } from "@expect";
import { AuthRequestDTO } from "~service/auth/auth.dto.ts";

describe("[AUTH]", () => {
    const loginMock = {
        cpfCnpj: "",
        senha: "",
        unidade: "",
    } as AuthRequestDTO;

    it("> Basic auth", async () => {
    });
});
