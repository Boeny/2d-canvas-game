import { Helpers } from "./Helpers";

export abstract class NumberHelpers {

    public static toInt(n: string): number {
        if (n === "") {
            throw new Error("NumberHelpers.toInt error: argument is empty string");
        }
        const result = parseInt(n, 10);
        if (isNaN(result)) {
            throw new Error(`NumberHelpers.toInt error: argument "${n}" is not a number`);
        }
        return Math.floor(result);
    }

    public static filler(n: number, char: string): string {
        return Helpers.range(n).map(() => char).join("");
    }

    public static padNumber(n: number, maxDigits: number): string {
        if (n < 0) {
            return String(n);
        }
        if (maxDigits <= 0) {
            return "";
        }
        for (let i = 0; i <= maxDigits; i += 1) {
            if (n < Math.pow(10, i + 1)) {
                return `${this.filler(maxDigits - 1 - i, "0")}${n}`;
            }
        }
        return String(n);
    }
}
