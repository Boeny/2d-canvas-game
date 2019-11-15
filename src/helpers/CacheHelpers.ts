
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
        if (key === undefined) { // remove all
            localStorage.clear();
        }
        else {
            localStorage.removeItem(key);
        }
    }

    public static setCachedObject<T>(key: string, data: T) {
        this.setCache(key, JSON.stringify(data));
    }

    public static getCachedObject<T>(key: string): T | undefined {

        try {
            const obj = this.getCache(key);
            return obj ? JSON.parse(obj) : undefined;
        }
        catch (e) {
            return undefined;
        }
    }
}
