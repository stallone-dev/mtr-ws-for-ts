// Create by Stallone L. de Souza (@stallone-dev) - 2025 - License: MPL-2.0
/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type * as MtrWsType from "./src/types.mtrws.ts";
import { createMtrWsClient } from "./src/client.mtrws.ts";

export {
    /**
     * Cliente de integração com o WebService de MTRs do SINIR/SIGOR.
     *
     * Esta biblioteca fornece um cliente unificado para consumir os serviços do MTR via WebService,
     * conforme especificações publicadas pelos órgãos ambientais (SINIR e SIGOR/CETESB).
     *
     * ---
     *
     * ### Exemplo - Criação e consumo de client
     * ```ts
     * import { MtrWsClient } from "jsr:@mtr-ws/mtr-ws-for-ts"
     *
     * const clientConfig = {} as const;
     * ```
     *
     * ---
     *
     * ### Versões verificadas:
     * - **SINIR:** 1.1.1
     * - **SIGOR:** 1.15.0
     *
     * ---
     *
     * ### Documentação oficial:
     * - [WebService SIGOR](https://cetesb.sp.gov.br/sigor-mtr/wp-content/uploads/sites/38/2021/03/SIGOR-MTR-Manual-de-Integracao-Web-Service.pdf)
     * - [WebService SINIR](https://admin.sinir.gov.br/api/swagger-ui.html)
     *
     * ---
     *
     * @module
     */
    createMtrWsClient as MtrWsClient,
    /**
     * Interfaces utilizadas na estruturação do WebService MTR do SINIR/SIGOR
     *
     * Este módulo unifica todas as interfaces utilizadas no processamento dos dados de Requisição e Resposta no WebService,
     * ideal para uso em funções personalizadas e tipagem forte.
     *
     * ---
     *
     * ### Exemplo - Função personalizada:
     *
     * ```ts
     * import type { MtrWsType } from "jsr:@mtr-ws/mtr-ws-for-ts"
     *
     * async function personalReceive(
     *      input:MtrWsType.ReceiveInterface.ReceberLoteMtrRequest
     * ):Promise<MtrWsType.ReceiveInterface.ReceberLoteMtrResponse> {
     *      //...lógica...
     * }
     * ```
     *
     * ---
     *
     * ### Exemplo - Client fortemente tipado:
     *
     * ```ts
     * import { type MtrWsType, MtrWsClient } from "jsr:@mtr-ws/mtr-ws-for-ts"
     *
     * const clientConfig: MtrWsType.WsClientInterface<"GERADOR"> = {
     *    role: "GERADOR",
     *    baseWebServer: "SINIR",
     *    cpf: "12345678900",
     *    senha: "123",
     *    unidade: "123456",
     *    persistentId: "[TEST_USER]",
     * } as const;
     *
     * const client = await createMtrWsClient(clientConfig);
     *
     * const mtrResiduosIbama = await client.listarResiduosIbama();
     * ```
     *
     * ---
     *
     * ### Versões verificadas:
     * - **SINIR:** 1.1.1
     * - **SIGOR:** 1.15.0
     *
     * ---
     *
     * ### Documentação oficial:
     * - [WebService SIGOR](https://cetesb.sp.gov.br/sigor-mtr/wp-content/uploads/sites/38/2021/03/SIGOR-MTR-Manual-de-Integracao-Web-Service.pdf)
     * - [WebService SINIR](https://admin.sinir.gov.br/api/swagger-ui.html)
     *
     * ---
     *
     * @module
     */
    type MtrWsType,
};
