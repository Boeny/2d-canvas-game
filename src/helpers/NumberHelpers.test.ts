import { NumberHelpers } from "./NumberHelpers";

describe("NumberHelpers methods", () => {

    it("filler should return filled string", () => {
        expect(NumberHelpers.filler(-1, "0")).toEqual("");
        expect(NumberHelpers.filler(0, "0")).toEqual("");
        expect(NumberHelpers.filler(1, "0")).toEqual("0");
        expect(NumberHelpers.filler(3, "0")).toEqual("000");
    });

    it("padNumber should return filled string with 0", () => {
        expect(NumberHelpers.padNumber(-1, 1)).toEqual("-1");
        expect(NumberHelpers.padNumber(1, -1)).toEqual("");
        expect(NumberHelpers.padNumber(1, 0)).toEqual("");
        expect(NumberHelpers.padNumber(1, 1)).toEqual("1");
        expect(NumberHelpers.padNumber(0, 2)).toEqual("00");
        expect(NumberHelpers.padNumber(1, 3)).toEqual("001");
        expect(NumberHelpers.padNumber(30, 4)).toEqual("0030");
    });
});
