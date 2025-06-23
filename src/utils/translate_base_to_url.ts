/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { type WsBase, WsBaseURL } from "~type/ws_config.type.ts";

export { WsBaseToBaseURL };

function WsBaseToBaseURL(base: WsBase): WsBaseURL {
    return BaseToUrlSchema[base];
}

const BaseToUrlSchema: Record<WsBase, WsBaseURL> = {
    SIGOR: WsBaseURL.SIGOR,
    SINIR: WsBaseURL.SINIR,
};
