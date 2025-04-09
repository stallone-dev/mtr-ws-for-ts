import { features } from "~features";
import { wrapInstrumented } from "./instrumentation.ts";

export { instrumentedFeatures };

const instrumentedFeatures = {
    sub: wrapInstrumented("emitirMtr", features.emitirMtr),
} as const;
