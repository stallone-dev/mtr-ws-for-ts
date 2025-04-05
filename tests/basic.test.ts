import { expect } from "@expect";

Deno.test({
    name: "test",
    fn(): void {
        expect(1).toStrictEqual(1);
    },
});
