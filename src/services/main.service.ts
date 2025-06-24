// Create by Stallone L. de Souza (@stallone-dev) - 2025 - License: MPL-2.0

import { FnWithInstrumentation } from "~util/instrumentation.ts";
import { authMethod } from "~service/auth/auth.service.ts";
import type { AuthRequest } from "~service/auth/auth.dto.ts";
import type { WsBaseURL } from "~type/ws_config.type.ts";

export { WsAuth };

const WsAuth = async (baseUrl: WsBaseURL, login: AuthRequest, userPersistentId?: string) =>
    await FnWithInstrumentation(
        () => authMethod(baseUrl, login),
        {
            sessionId: "",
            userPersistentId: userPersistentId ?? "",
            userRole: "AUTH",
            spanName: "AuthMethod",
        },
        "auth",
        { unidade: login.unidade },
    );
