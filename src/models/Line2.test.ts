import { Vector2 } from "./Vector2";
import { Line2 } from "./Line2";

describe("Line2", () => {
    it("intersection", () => {
        const horizontal = new Line2(0, 0, 10, 0);
        const vertical = new Line2(0, 0, 0, 10);
        const line = new Line2(0, 10, 10, 20);
        expect(horizontal.intersection(vertical)).toEqual(new Vector2());
        expect(horizontal.intersection(line)).toEqual(new Vector2(-10, 0));
        expect(vertical.intersection(line)).toEqual(new Vector2(0, 10));
        expect(horizontal.intersection(new Line2(0, 1, 10, 1))).toEqual(null);
        expect(vertical.intersection(new Line2(1, 0, 1, 10))).toEqual(null);
    });
});
