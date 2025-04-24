// Create by Stallone L. de Souza (@stallone-dev) - 2025 - License: MPL-2.0

import { FnWithInstrumentation } from "~util/instrumentation.ts";
import type { TemplateResponseDTO } from "./_template/template.dto.ts";
import { methodTemplate } from "./_template/template.service.ts";
import { authMethod } from "~service/auth/auth.service.ts";
import type { AuthRequestDTO } from "~service/auth/auth.dto.ts";
import type { WsBaseURL } from "~type/ws_config.type.ts";

export { methodTemplate, type TemplateResponseDTO, WsAuth };

const WsAuth = async (baseUrl: WsBaseURL, login: AuthRequestDTO) =>
    await FnWithInstrumentation(
        () => authMethod({ token: "", baseUrl }, login),
        {
            sessionId: "",
            spanName: "AuthMethod",
        },
        { unidade: login.unidade },
    );
