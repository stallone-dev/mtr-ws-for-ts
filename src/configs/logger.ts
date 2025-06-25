import { getLogger } from "@logtape";

export { logger };

/**
 * Logger principal do projeto para rastreio dos dados gerados pela lib
 */
const logger = getLogger(["mtr-ws-wrapper-ts"]);
