import { createMtrWsClient } from "./client.factory.ts";
import { WsBaseURL } from "~type/ws_config.type.ts";

createMtrWsClient;

const client = createMtrWsClient({
    baseUrl: WsBaseURL.SINIR,
    role: "TRANSPORTADOR",
    token: "abc123",
});

client.consultarMtr("123");
