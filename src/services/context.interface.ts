// Create by Stallone L. de Souza (@stallone-dev) - 2025 - License: MPL-2.0

import type { WsUserRole } from "~type/ws_config.type.ts";
export type { WsMethodContext };

interface WsMethodContext {
    token: string;
    baseUrl: string;
    role: WsUserRole;
}
