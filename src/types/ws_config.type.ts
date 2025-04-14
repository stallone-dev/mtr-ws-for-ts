// Create by Stallone L. de Souza (@stallone-dev) - 2025 - License: MPL-2.0

export { WsBaseURL, type WsClientConfig, type WsUserRole };

type WsUserRole = "GERADOR" | "TRANSPORTADOR" | "DESTINADOR";

enum WsBaseURL {
    SINIR = "https://admin.sinir.gov.br/apiws/rest",
    SIGOR = "https://mtrr.cetesb.sp.gov.br/apiws/rest",
}

interface WsClientConfig {
    token: string;
    baseUrl: WsBaseURL;
    role: WsUserRole;
}
