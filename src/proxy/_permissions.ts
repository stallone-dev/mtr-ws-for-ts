import type { features } from "~features";

export { type RolePermissions, rolePermissionsSet, type WsUserRole };

type WsUserRole = "GERADOR" | "TRANSPORTADOR" | "RECEPTOR";
type RolePermissions = typeof rolePermissionsSet;

const rolePermissionsSet: Record<WsUserRole, (keyof typeof features)[]> = {
    GERADOR: ["emitirMtr"],
    RECEPTOR: ["add"],
    TRANSPORTADOR: ["emitirMtr"],
} as const;
