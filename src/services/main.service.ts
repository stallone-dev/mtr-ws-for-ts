import type { WsClientConfig } from "~type/ws_config.type.ts";
import { WsMethodContext } from "./context.interface.ts";

export { wsFeatureMethods };

const wsFeatureMethods = {
    consultarMtr: (ctx: WsMethodContext) => async (mtrId: string) => {
        console.log(`Consultando MTR ${mtrId} em ${ctx.baseUrl} com token ${ctx.token}`);
        // Implementação real aqui...
        return { manNumero: mtrId, status: "consultado" };
    },
    gerarMtr: (ctx: WsMethodContext) => async (payload: unknown) => {
        console.log(`Gerando MTR em ${ctx.baseUrl} com token ${ctx.token}`, payload);
        // Implementação real aqui...
        return { manNumero: "gerado-123", mensagem: "sucesso" };
    },
    receberMtr: (ctx: WsMethodContext) => async (payload: unknown) => {
        console.log(`Recebendo MTR em ${ctx.baseUrl} com token ${ctx.token}`, payload);
        // Implementação real aqui...
        return { manNumero: "recebido-456", status: "finalizado" };
    },
} as const;
