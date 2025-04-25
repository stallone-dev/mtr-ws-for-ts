/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { tracer } from "~telemetry";
import { logger } from "~logger";
import { ulid } from "@ulid";
import type { WsUserRole } from "~type/ws_config.type.ts";

export { FnWithInstrumentation };

/**
 * Aplica instrumentação completa sobre uma função e a executa.
 *
 * @param spanName - Nome da operação.
 * @param fn - Função assíncrona a ser executada.
 * @param debugInputContext - Input rastreável para debug.
 */
async function FnWithInstrumentation<T>(
    fn: () => Promise<T>,
    id: {
        spanName: string;
        sessionId: string;
        userPersistentId: string;
        userRole: WsUserRole | "AUTH" | "TEST";
    },
    debugInputContext?: unknown,
): Promise<T> {
    const requestId = ulid();
    const startTime = Date.now();
    const span = tracer.startSpan(id.spanName);
    span.setAttribute("session.id", id.sessionId);
    span.setAttribute("request.id", requestId);
    span.setAttribute("user.id", id.userPersistentId);
    span.setAttribute("user.role", id.userRole);

    logger.info(`[${id.spanName}] > Init fn`, {
        event: id.spanName,
        phase: "start",
        userPersistentId: id.userPersistentId,
        userRole: id.userRole,
        sessionId: id.sessionId,
        requestId,
        timestamp: new Date(startTime).toISOString(),
    });
    logger.debug(`[${id.spanName}] > Input data`, {
        event: id.spanName,
        phase: "input",
        userPersistentId: id.userPersistentId,
        userRole: id.userRole,
        sessionId: id.sessionId,
        requestId,
        data: debugInputContext,
    });

    try {
        const result = await fn();
        const duration = Date.now() - startTime;

        logger.debug(`[${id.spanName}] > Output data`, {
            event: id.spanName,
            phase: "output",
            userPersistentId: id.userPersistentId,
            userRole: id.userRole,
            sessionId: id.sessionId,
            requestId,
            data: result,
        });
        logger.info(`[${id.spanName}] > Finished fn`, {
            event: id.spanName,
            phase: "success",
            userPersistentId: id.userPersistentId,
            userRole: id.userRole,
            sessionId: id.sessionId,
            requestId,
            durationMs: duration,
        });

        span.setAttribute("status", "ok");
        span.setAttribute("duration.ms", duration);

        return result;
    } catch (error) {
        const errorTime = new Date();
        const duration = Date.now() - startTime;

        logger.error(`[${id.spanName}] > Error`, {
            event: id.spanName,
            phase: "error",
            userPersistentId: id.userPersistentId,
            userRole: id.userRole,
            sessionId: id.sessionId,
            requestId,
            timestamp: errorTime.toISOString(),
            durationMs: duration,
            error: error instanceof Error ? error.message : String(error),
        });

        span.setAttribute("status", "error");
        span.setAttribute("duration.ms", duration);
        span.recordException(error as Error);

        throw error;
    } finally {
        span.end();
    }
}
