/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { WsMethodContext } from "~type/ws_config.type.ts";
import { FnWithInstrumentation, type MetadataForInstrumentation } from "~util/instrumentation.ts";
import { consultarMTRMethod } from "./consultar_mtr/consultar_mtr.service.ts";
import { listarClassesMethod } from "./listar_classes/listar_classes.service.ts";
import { listarAcondicionamentosMethod } from "./listar_acondicionamentos/listar_acondicionamentos.service.ts";
import { listarAcondicionamentosPorEstadoFisicoMethod } from "./listar_acondicionamentos_por_estado_fisico/listar_acondicionamentos_por_estado_fisico.service.ts";
import { listarClassesPorResiduoMethod } from "./listar_classes_por_residuo/listar_classes_por_residuo.service.ts";
import { listarEstadosFisicosMethod } from "./listar_estados_fisicos/listar_estados_fisicos.service.ts";
import { listarResiduosMethod } from "./listar_residuos_ibama/listar_residuos_ibama.service.ts";
import { listarTratamentosMethod } from "./listar_tratamentos/listar_tratamentos.service.ts";
import { listarUnidadesMedidaMethod } from "./listar_unidades_medida/listar_unidades_medida.service.ts";

export { createConsultMethods };

// deno-lint-ignore explicit-function-return-type
function createConsultMethods(
    ctx: WsMethodContext,
    metaData: MetadataForInstrumentation,
) {
    function wrap<R>(
        fn: (ctx: WsMethodContext) => Promise<R>,
        spanName: string,
    ): () => Promise<R>;

    function wrap<P, R>(
        fn: (ctx: WsMethodContext, payload: P) => Promise<R>,
        spanName: string,
    ): (payload: P) => Promise<R>;

    function wrap<P, R>(
        fn: (ctx: WsMethodContext, payload?: P) => Promise<R>,
        spanName: string,
    ): () => Promise<R> {
        return (payload?: P) =>
            FnWithInstrumentation(
                () => fn(ctx, payload),
                { ...metaData, spanName },
                "consult",
                payload,
            );
    }

    return {
        consultarMtr: wrap(consultarMTRMethod, `${metaData.userRole}.consultarMtr`),
        listarClasses: wrap(listarClassesMethod, `${metaData.userRole}.listarClasses`),
        listarAcondicionamentos: wrap(listarAcondicionamentosMethod, `${metaData.userRole}.listarAcondicionamentos`),
        listarAcondicionamentosPorEstadoFisico: wrap(
            listarAcondicionamentosPorEstadoFisicoMethod,
            `${metaData.userRole}.listarAcondicionamentosPorEstadoFisico`,
        ),
        listarClassesPorResiduo: wrap(listarClassesPorResiduoMethod, `${metaData.userRole}.listarClassesPorResiduo`),
        listarEstadosFisicos: wrap(listarEstadosFisicosMethod, `${metaData.userRole}.listarEstadosFisicos`),
        listarResiduos: wrap(listarResiduosMethod, `${metaData.userRole}.listarResiduos`),
        listarTratamentos: wrap(listarTratamentosMethod, `${metaData.userRole}.listarTratamentos`),
        listarUnidadesMedida: wrap(listarUnidadesMedidaMethod, `${metaData.userRole}.listarUnidadesMedida`),
    };
}
