/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export { WsBaseURL, type WsClientConfig, type WsUserRole };

type WsUserRole = "GERADOR" | "TRANSPORTADOR" | "DESTINADOR";

interface WsClientConfig<R extends WsUserRole = WsUserRole> {
    token: string;
    baseUrl: WsBaseURL;
    role: R;
}

enum WsBaseURL {
    SINIR = "https://admin.sinir.gov.br/apiws/rest",
    SIGOR = "https://mtrr.cetesb.sp.gov.br/apiws/rest",
}
