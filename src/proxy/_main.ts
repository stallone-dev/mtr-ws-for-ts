import { createProxyApi } from "./proxy.ts";

export { createProxyApi };

const a = createProxyApi({
    authToken: "",
    baseUrl: "",
    role: "RECEPTOR",
});

a.add();
a.emitirMtr();
