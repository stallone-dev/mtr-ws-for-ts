// main.service.ts
interface WsMethodContext {
    token: string;
    baseUrl: string;
    role: WsUserRole;
}

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

//ws_config.type.ts
type WsClientConfig<R extends WsUserRole = WsUserRole> = { role: R; token: string; baseUrl: WsBaseURL };

type WsUserRole = "GERADOR" | "TRANSPORTADOR" | "DESTINADOR";

enum WsBaseURL {
    SINIR = "https://admin.sinir.gov.br/apiws/rest",
    SIGOR = "https://mtrr.cetesb.sp.gov.br/apiws/rest",
}

//role_methods_mapping.ts
type WsFeatureMethodKeys = keyof typeof wsFeatureMethods;

function defineRoleMethodsMap<T extends Record<WsUserRole, readonly WsFeatureMethodKeys[]>>(map: T): T {
    return map;
}

const roleMethodsMap = defineRoleMethodsMap(
    {
        GERADOR: ["consultarMtr", "gerarMtr"],
        TRANSPORTADOR: ["consultarMtr"],
        DESTINADOR: ["consultarMtr", "receberMtr"],
    } as const,
);

// methods_allowed.type.ts
type WsRoleAllowedMapping = typeof roleMethodsMap;

type WsRoleMap = {
    [R in keyof WsRoleAllowedMapping]: Pick<typeof wsFeatureMethods, WsRoleAllowedMapping[R][number]>;
};

const wsMethodsMap: WsRoleMap = Object.fromEntries(
    Object.entries(roleMethodsMap).map(([role, methods]) => [
        role,
        Object.fromEntries(methods.map((method) => [method, wsFeatureMethods[method]])),
    ]),
) as WsRoleMap;

// client.factory.ts
function createMtrWsClient<R extends keyof WsRoleAllowedMapping>(
    config: WsClientConfig<R>,
): WsRoleMap[R] {
    const allowedKeys = new Set(roleMethodsMap[config.role]);
    const target = wsMethodsMap[config.role];

    const handler: ProxyHandler<WsRoleMap[R]> = {
        get(target, prop, receiver) {
            if (typeof prop === "string" && allowedKeys.has(prop as WsFeatureMethodKeys)) {
                return Reflect.get(target, prop, receiver);
            }
            throw new Error(`Access denied: '${String(prop)}' is not allowed for role ${config.role}`);
        },
    };

    return new Proxy(target, handler);
}
