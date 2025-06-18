/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { ulid } from "@ulid";
import { WsAuth } from "~service/main.service.ts";
import { FnWithInstrumentation } from "~util/instrumentation.ts";
import type { WsBaseURL, WsClientConfig, WsUserRole } from "~type/ws_config.type.ts";
import type { WsMethodContext } from "~type/method_config.type.ts";

import type {
    ConsultarMTRRequestDTO,
    ConsultarMTRResponseDTO,
} from "~service/consult/consultar_mtr/consultar_mtr.dto.ts";
import type {
    ListarAcondicionamentosPorEstadoFisicoRequestDTO,
    ListarAcondicionamentosPorEstadoFisicoResponseDTO,
} from "~service/consult/listar_acondicionamentos_por_estado_fisico/listar_acondicionamentos_por_estado_fisico.dto.ts";
import type {
    ListarClassesPorResiduoRequestDTO,
    ListarClassesPorResiduoResponseDTO,
} from "~service/consult/listar_classes_por_residuo/listar_classes_por_residuo.dto.ts";
import type { DownloadMTRRequestDTO, DownloadMTRResponseDTO } from "~service/download/mtr/download_mtr.dto.ts";
import type { DownloadCDFRequestDTO, DownloadCDFResponseDTO } from "~service/download/cdf/download_cdf.dto.ts";
import type { ListarClassesResponseDTO } from "~service/consult/listar_classes/listar_classes.dto.ts";
import type { ListarAcondicionamentosResponseDTO } from "~service/consult/listar_acondicionamentos/listar_acondicionamentos.dto.ts";
import type { ListarEstadosFisicosDTO } from "~service/consult/listar_estados_fisicos/listar_estados_fisicos.dto.ts";
import type { ListarResiduosDTO } from "~service/consult/listar_residuos_ibama/listar_residuos_ibama.dto.ts";
import type { ListarTratamentosDTO } from "~service/consult/listar_tratamentos/listar_tratamentos.dto.ts";
import type { ListarUnidadesMedidaDTO } from "~service/consult/listar_unidades_medida/listar_unidades_medida.dto.ts";

import { consultarMTRMethod } from "~service/consult/consultar_mtr/consultar_mtr.service.ts";
import { listarAcondicionamentosMethod } from "~service/consult/listar_acondicionamentos/listar_acondicionamentos.service.ts";
import { listarAcondicionamentosPorEstadoFisicoMethod } from "~service/consult/listar_acondicionamentos_por_estado_fisico/listar_acondicionamentos_por_estado_fisico.service.ts";
import { listarClassesMethod } from "~service/consult/listar_classes/listar_classes.service.ts";
import { listarClassesPorResiduoMethod } from "~service/consult/listar_classes_por_residuo/listar_classes_por_residuo.service.ts";
import { listarEstadosFisicosMethod } from "~service/consult/listar_estados_fisicos/listar_estados_fisicos.service.ts";
import { listarResiduosMethod } from "~service/consult/listar_residuos_ibama/listar_residuos_ibama.service.ts";
import { listarTratamentosMethod } from "~service/consult/listar_tratamentos/listar_tratamentos.service.ts";
import { listarUnidadesMedidaMethod } from "~service/consult/listar_unidades_medida/listar_unidades_medida.service.ts";
import { downloadMTRMethod } from "~service/download/mtr/download_mtr.service.ts";
import { downloadCDFMethod } from "~service/download/cdf/download_cdf.service.ts";

export { BaseMtrWsClient };

abstract class BaseMtrWsClient {
    protected readonly token: string;
    protected readonly baseUrl: WsBaseURL;
    protected readonly role: string;
    protected readonly sessionId: string;
    protected readonly userPersistentId: string;
    protected readonly BASE_CTX: WsMethodContext;

    protected constructor(config: WsClientConfig, token: string) {
        this.token = token;
        this.baseUrl = config.baseUrl;
        this.role = config.role;
        this.sessionId = ulid();
        this.userPersistentId = config.persistentId ?? "";
        this.BASE_CTX = { baseUrl: config.baseUrl, token };
    }

    public static async create<T extends BaseMtrWsClient>(
        this: new (params: WsClientConfig, token: string) => T,
        params: WsClientConfig,
    ): Promise<T> {
        const token = await WsAuth(params.baseUrl, {
            cpfCnpj: String(params.cpf),
            senha: String(params.senha),
            unidade: String(params.unidade),
        });
        return new this(params, token);
    }

    protected async instrumentedCall<T>(
        fn: () => Promise<T>,
        spanName: string,
        debugInputContext?: unknown,
    ): Promise<T> {
        return await FnWithInstrumentation(
            fn,
            {
                sessionId: this.sessionId,
                userPersistentId: this.userPersistentId,
                userRole: this.role as WsUserRole,
                spanName,
            },
            debugInputContext,
        );
    }

    public async consultarMtr(mtrId: ConsultarMTRRequestDTO): Promise<ConsultarMTRResponseDTO> {
        return await this.instrumentedCall(
            () => consultarMTRMethod(this.BASE_CTX, mtrId),
            `${this.role}.consultarMtr`,
            { mtrId },
        );
    }

    public async listarAcondicionamentos(): Promise<ListarAcondicionamentosResponseDTO> {
        return await this.instrumentedCall(
            () => listarAcondicionamentosMethod(this.BASE_CTX),
            `${this.role}.listarAcondicionamentos`,
        );
    }

    public async listarAcondicionamentosPorEstadoFisico(
        estadoFisicoId: ListarAcondicionamentosPorEstadoFisicoRequestDTO,
    ): Promise<ListarAcondicionamentosPorEstadoFisicoResponseDTO> {
        return await this.instrumentedCall(
            () => listarAcondicionamentosPorEstadoFisicoMethod(this.BASE_CTX, estadoFisicoId),
            `${this.role}.listarAcondicionamentoPorEstadoFisico`,
            { estadoFisicoId },
        );
    }

    public async listarClasses(): Promise<ListarClassesResponseDTO> {
        return await this.instrumentedCall(
            () => listarClassesMethod(this.BASE_CTX),
            `${this.role}.listarClasses`,
        );
    }

    public async listarClassesPorResiduo(
        residuoIdIbama: ListarClassesPorResiduoRequestDTO,
    ): Promise<ListarClassesPorResiduoResponseDTO> {
        return await this.instrumentedCall(
            () => listarClassesPorResiduoMethod(this.BASE_CTX, residuoIdIbama),
            `${this.role}.listarClassesPorResiduoIbama`,
            { residuoIdIbama },
        );
    }

    public async listarEstadosFisicos(): Promise<ListarEstadosFisicosDTO> {
        return await this.instrumentedCall(
            () => listarEstadosFisicosMethod(this.BASE_CTX),
            `${this.role}.listarEstadosFisicos`,
        );
    }

    public async listarResiduosIbama(): Promise<ListarResiduosDTO> {
        return await this.instrumentedCall(
            () => listarResiduosMethod(this.BASE_CTX),
            `${this.role}.listarResiduosIbama`,
        );
    }

    public async listarTratamentos(): Promise<ListarTratamentosDTO> {
        return await this.instrumentedCall(
            () => listarTratamentosMethod(this.BASE_CTX),
            `${this.role}.listarTratamentos`,
        );
    }

    public async listarUnidadesMedida(): Promise<ListarUnidadesMedidaDTO> {
        return await this.instrumentedCall(
            () => listarUnidadesMedidaMethod(this.BASE_CTX),
            `${this.role}.listarUnidadesMedida`,
        );
    }

    public async downloadMTR(mtrId: DownloadMTRRequestDTO): Promise<DownloadMTRResponseDTO> {
        return await this.instrumentedCall(
            () => downloadMTRMethod(this.BASE_CTX, mtrId),
            `${this.role}.downloadMTR`,
            { mtrId },
        );
    }

    public async downloadCDF(cdfId: DownloadCDFRequestDTO): Promise<DownloadCDFResponseDTO> {
        return await this.instrumentedCall(
            () => downloadCDFMethod(this.BASE_CTX, cdfId),
            `${this.role}.downloadCDF`,
            { cdfId },
        );
    }
}
