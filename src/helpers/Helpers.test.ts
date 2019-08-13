import { Helpers } from "./Helpers";

describe("Helpers methods", () => {

    it("range should return array of indices", () => {
        expect(Helpers.range(0)).toEqual([]);
        expect(Helpers.range(-1)).toEqual([]);
        expect(Helpers.range(1)).toEqual([0]);
        expect(Helpers.range(3)).toEqual([0, 1, 2]);
        expect(Helpers.range(0, -1)).toEqual([]);
        expect(Helpers.range(1, 0)).toEqual([0]); // === range(1)
        expect(Helpers.range(0, 1)).toEqual([0, 1]);
        expect(Helpers.range(1, 3)).toEqual([1, 2, 3]);
        expect(Helpers.range(-1, 0)).toEqual([-1, 0]);
        expect(Helpers.range(-1, 2)).toEqual([-1, 0, 1, 2]);
        expect(Helpers.range(-1, -3)).toEqual([]); // === range(-1)
        expect(Helpers.range(-3, -1)).toEqual([-3, -2, -1]);
    });

    it("flatten should return flatten data", () => {
        expect(Helpers.flatten([["1"], ["2"]])).toEqual(["1", "2"]);
        expect(Helpers.flatten([["1", "2"], ["3", "4"], ["5"]])).toEqual(["1", "2", "3", "4", "5"]);
    });

    it("uniq should return uniq data", () => {
        expect(Helpers.uniq(["1", "2", "2", "3"], false, x => x)).toEqual(["1", "2", "3"]);
        expect(Helpers.uniq(["1", "2", "2", "3", "1"], false, x => x)).toEqual(["1", "2", "3"]);
        expect(Helpers.uniq(["1", "2", "2", "3", "1"], true, x => x)).toEqual(["2", "3", "1"]);
    });
});
