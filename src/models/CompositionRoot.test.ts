import { CompositionRoot } from "./CompositionRoot";
import { Vector2 } from "./Vector2";

describe("CompositionRoot", () => {
    it("applyInfiniteMovement", () => {
        const root = new CompositionRoot(500, 500);
        expect(root.applyInfiniteMovement(new Vector2())).toEqual(new Vector2());
        expect(root.applyInfiniteMovement(new Vector2(500, 500))).toEqual(new Vector2(500, 500));
        expect(root.applyInfiniteMovement(new Vector2(-1, -1))).toEqual(new Vector2(499, 499));
        expect(root.applyInfiniteMovement(new Vector2(501, 501))).toEqual(new Vector2(1, 1));
    });
});
