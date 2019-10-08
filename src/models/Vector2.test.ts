import { Vector2 } from "./Vector2"

describe("Vector2", () => {
    it("distance", () => {
        expect(Vector2.up.distance(new Vector2())).toEqual(1);
        expect(Vector2.up.distance(Vector2.right)).toEqual(Math.sqrt(2));
        expect(new Vector2(50, 50).distance(new Vector2(100, 100))).toEqual(Math.sqrt(5000));
        expect(new Vector2(500, 500).distance(new Vector2(1000, 1000))).toEqual(Math.sqrt(500000));
    });
});
