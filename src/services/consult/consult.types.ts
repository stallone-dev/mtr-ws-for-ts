/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { ConsultarMtrRequest, ConsultarMtrResponse } from "./consultar_mtr/consultar_mtr.dto.ts";
import type { ListarAcondicionamentosResponse } from "./listar_acondicionamentos/listar_acondicionamentos.dto.ts";
import type {
    ListarAcondicionamentosPorEstadoFisicoRequest,
    ListarAcondicionamentosPorEstadoFisicoResponse,
} from "./listar_acondicionamentos_por_estado_fisico/listar_acondicionamentos_por_estado_fisico.dto.ts";
import type { ListarClassesResponse } from "./listar_classes/listar_classes.dto.ts";
import type {
    ListarClassesPorResiduoRequest,
    ListarClassesPorResiduoResponse,
} from "./listar_classes_por_residuo/listar_classes_por_residuo.dto.ts";
import type { ListarEstadosFisicosResponse } from "./listar_estados_fisicos/listar_estados_fisicos.dto.ts";
import type { ListarResiduosResponse } from "./listar_residuos_ibama/listar_residuos_ibama.dto.ts";
import type { ListarTratamentosResponse } from "./listar_tratamentos/listar_tratamentos.dto.ts";
import type { ListarUnidadesMedidaResponse } from "./listar_unidades_medida/listar_unidades_medida.dto.ts";

export type {
    ConsultarMtrRequest,
    ConsultarMtrResponse,
    ListarAcondicionamentosPorEstadoFisicoRequest,
    ListarAcondicionamentosPorEstadoFisicoResponse,
    ListarAcondicionamentosResponse,
    ListarClassesPorResiduoRequest,
    ListarClassesPorResiduoResponse,
    ListarClassesResponse,
    ListarEstadosFisicosResponse,
    ListarResiduosResponse,
    ListarTratamentosResponse,
    ListarUnidadesMedidaResponse,
};
