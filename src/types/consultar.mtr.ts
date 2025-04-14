// src/methods/consultarMtr.ts
import type { ConsultarMtrResponseDTO } from "./dto.type.ts";
import type { WsClientConfig } from "../types/ws_config.type.ts";

export async function consultarMtr(
    ctx: { token: string; baseUrl: string },
    mtrId: string,
): Promise<ConsultarMtrResponseDTO> {
    const endpoint = `${ctx.baseUrl}/retornaManifesto/${mtrId}`;
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ctx.token}`,
        },
    });
    // Aqui você pode validar via zod; para simplificar, simulamos o retorno:
    return await response.json();
}

// src/methods/gerarMtr.ts
import type { GeradorResponseDTO } from "./dto.type.ts";

export async function gerarMtr(ctx: { token: string; baseUrl: string }, payload: unknown): Promise<GeradorResponseDTO> {
    const endpoint = `${ctx.baseUrl}/gerarManifesto`;
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ctx.token}`,
        },
        body: JSON.stringify(payload),
    });
    return await response.json();
}

// src/methods/receberMtr.ts
import type { DestinadorResponseDTO } from "./dto.type.ts";

export async function receberMtr(
    ctx: { token: string; baseUrl: string },
    payload: unknown,
): Promise<DestinadorResponseDTO> {
    const endpoint = `${ctx.baseUrl}/receberManifesto`;
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ctx.token}`,
        },
        body: JSON.stringify(payload),
    });
    return await response.json();
}
