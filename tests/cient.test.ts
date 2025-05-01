import { describe, it } from "@testing/bdd";
import { expect } from "@expect";

import type { WsClientConfig, WsUserRole } from "~type/ws_config.type.ts";
import { WsBaseURL } from "~type/ws_config.type.ts";

import { DestinadorClient } from "~class/destinador.class.ts";
import { TransportadorClient } from "~class/transportador.class.ts";
import { GeradorClient } from "~class/gerador.class.ts";
import { createMtrWsClient } from "../src/client.mtrws.ts";

describe("[CLIENT INSTANCE]", () => {
    const env = Deno.env.toObject();

    const configMock = {
        baseUrl: WsBaseURL.SINIR,
        cpf: env.SINIR_CPF_ADMIN,
        unidade: env.SINIR_UNIDADE,
        senha: env.SINIR_PASSWORD,
    } as const;

    it("> Instance of GeradorClient", async () => {
        const client = await createMtrWsClient({ ...configMock, role: "GERADOR" });
        expect(client).toBeInstanceOf(GeradorClient);
    });

    it("> Instance of TransportadorClient", async () => {
        const client = await createMtrWsClient({ ...configMock, role: "TRANSPORTADOR" });
        expect(client).toBeInstanceOf(TransportadorClient);
    });

    it("> Instance of DestinadorClient", async () => {
        const client = await createMtrWsClient({ ...configMock, role: "DESTINADOR" });
        expect(client).toBeInstanceOf(DestinadorClient);
    });

    it("> Invalid instance", async () => {
        const invalidConfig = { ...configMock, role: "INVALID" } as unknown as WsClientConfig<WsUserRole>;
        await expect(createMtrWsClient(invalidConfig)).rejects.toThrow(/Role não suportado/);
    });
});
