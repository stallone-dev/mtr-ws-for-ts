import { features } from "./features.ts";

const rolePermissions = {
    USER: ["add"],
    ADMIN: ["add", "sub", "callApi"],
    SUPERVISOR: ["add", "callApi"],
} as const;

type RolePermissions = typeof rolePermissions;
type RoleApiMap = {
    [R in keyof RolePermissions]: Pick<typeof features, RolePermissions[R][number]>;
};

const apiMap: RoleApiMap = Object.fromEntries(
    Object.entries(rolePermissions).map(([role, methods]) => [
        role,
        Object.fromEntries(methods.map((method) => [method, features[method]])),
    ]),
) as RoleApiMap;

function createApi<R extends keyof RolePermissions>(
    config: { user: string; role: R },
): RoleApiMap[R] {
    const allowedKeys = new Set(rolePermissions[config.role]);
    const target = apiMap[config.role];

    return new Proxy(target, {
        get(target, prop, receiver) {
            if (typeof prop === "string" && allowedKeys.has(prop as keyof typeof features)) {
                return Reflect.get(target, prop, receiver);
            }
            throw new Error(`Access denied: '${String(prop)}' is not allowed for role ${config.role}`);
        },
    }) as RoleApiMap[R];
}

const user = createApi({ user: "stal", role: "USER" });

user.add(1, 2);
user.sub(1n, 2n);
user.callApi({ password: "1", username: "" });
