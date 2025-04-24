import { describe, it } from "@testing/bdd";
import { expect } from "@expect";

import type { WsClientConfig, WsUserRole } from "~type/ws_config.type.ts";
import { WsBaseURL } from "~type/ws_config.type.ts";

import { DestinadorClient } from "~class/destinador.class.ts";
import { TransportadorClient } from "~class/transportador.class.ts";
import { GeradorClient } from "~class/gerador.class.ts";
import { createMtrWsClient } from "../src/client.mtrws.ts";

describe("[CLIENT INSTANCE]", () => {
    const configMock = {
        baseUrl: WsBaseURL.SINIR,
        token: "[FAKE]",
    } as const;

    it("> Instance of GeradorClient", () => {
        const client = createMtrWsClient({ ...configMock, role: "GERADOR" });
        expect(client).toBeInstanceOf(GeradorClient);
    });

    it("> Instance of TransportadorClient", () => {
        const client = createMtrWsClient({ ...configMock, role: "TRANSPORTADOR" });
        expect(client).toBeInstanceOf(TransportadorClient);
    });

    it("> Instance of DestinadorClient", () => {
        const client = createMtrWsClient({ ...configMock, role: "DESTINADOR" });
        expect(client).toBeInstanceOf(DestinadorClient);
    });

    it("> Invalid instance", () => {
        const invalidConfig = { ...configMock, role: "INVALID" } as unknown as WsClientConfig<WsUserRole>;
        expect(() => createMtrWsClient(invalidConfig)).toThrow(/Role não suportado/);
    });
});
