import { context, type Span, trace } from "@opentelemetry";
import { logger } from "~logger";
import { features } from "~features";
import { type RolePermissions, rolePermissionsSet, type WsUserRole } from "./_permissions.ts";

export { createProxyApi };

function createProxyApi<R extends keyof RolePermissions>(
    config: { authToken: string; baseUrl: string; role: WsUserRole },
): Readonly<RoleMap[R]> {
    const allowedKeys = new Set(rolePermissionsSet[config.role]);
    const target = apiMap[config.role];

    return Object.freeze(
        new Proxy(target, {
            get(target, prop, receiver) {
                if (typeof prop === "string") {
                    const activeSpan = trace.getSpan(context.active());

                    if (isAllowed(prop, allowedKeys)) {
                        logAccess(activeSpan, config.role, prop);
                        return Reflect.get(target, prop, receiver);
                    }
                    logDeniedAccess(activeSpan, config.role, prop);
                }
                throw new Error(`Access denied: '${String(prop)}' is not allowed for role '${config.role}'`);
            },
        }) as RoleMap[R],
    );
}

function isAllowed(prop: string, allowedKeys: Set<string>): boolean {
    return allowedKeys.has(prop);
}

function logAccess(span: Span | undefined, role: string, prop: string): void {
    logger.info(`Access granted: for role '${role}' accessed '${prop}'`);
    span?.addEvent("Access granted", {
        role: role,
        method: prop,
    });
}

function logDeniedAccess(span: Span | undefined, role: string, prop: string): void {
    logger.warn(`Access denied for role '${role}' tried to access '${prop}'`);
    span?.addEvent("Access denied", {
        role: role,
        method: prop,
    });
}

type RoleMap = {
    [R in keyof RolePermissions]: Pick<typeof features, RolePermissions[R][number]>;
};

const apiMap: RoleMap = Object.fromEntries(
    Object.entries(rolePermissionsSet).map(([role, methods]) => [
        role,
        Object.fromEntries(methods.map((method) => [method, features[method]])),
    ]),
) as RoleMap;
