import { isNullOrUndefined } from "util";

export abstract class Helpers {

    public static uniq<T, U>(data: T[], replace: boolean, getKey: (x: T) => U): T[] {
        return data.reduce<T[]>(
            (result, item) => {
                const currentKey = getKey(item);
                const index = result.findIndex(x => getKey(x) === currentKey);

                if (index === -1) {
                    return result.concat(item);
                }
                if (replace) {
                    result.splice(index, 1);
                    return result.concat(item);
                }
                return result;
            },
            []
        );
    }

    public static flatten<T>(array: T[][]): T[] {
        return array.reduce<T[]>((result, arr) => result.concat(arr), []);
    }

    public static range(min: number, max?: number): number[] {
        if (isNullOrUndefined(max) || min > max) {
            return Array.from({ length: min }).map((_, i) => i);
        }
        return Array.from({ length: max + 1 - min }).map((_, i) => i + min);
    }

    public static random(min: number, max?: number) {
        if (isNullOrUndefined(max) || min > max) {
            return Math.random() * min;
        }
        return Math.random() * (max - min) + min;
    }
}
