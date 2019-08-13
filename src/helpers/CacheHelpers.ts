import { isNullOrUndefined } from "util";

export abstract class CacheHelpers {

    public static setCache(key: string, value: string) {

        if (!window.localStorage) {
            return;
        }
        localStorage.setItem(key, value);
    }

    public static getCache(key: string): string | null {

        if (!window.localStorage) {
            return null;
        }
        return localStorage.getItem(key);
    }

    public static clearCache(key?: string) {

        if (!window.localStorage) {
            return null;
        }
        if (isNullOrUndefined(key)) { // remove all
            localStorage.clear();
        }
        else {
            localStorage.removeItem(key);
        }
    }

    public static setCachedObject<T>(key: string, data: T) {
        this.setCache(key, JSON.stringify(data));
    }

    public static getCachedObject<T>(key: string): T | null {

        try {
            const obj = this.getCache(key);
            return isNullOrUndefined(obj) ? null : JSON.parse(obj);
        }
        catch (e) {
            return null;
        }
    }
}
