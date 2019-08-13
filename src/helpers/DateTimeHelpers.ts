
export abstract class DateTimeHelpers {

    /** Max date that can be chosen in date picker */
    public static readonly MAX_DATE = new Date("2050-01-01");

    /**
     * Gets date from different types
     * @param date Date
     */
    public static getDate(date: Date | string | number): Date {
        let _date: Date;

        if (date instanceof Date) {
            _date = date;
        }
        else _date = new Date(date);

        return _date;
    }

    public static timeFromMinutes(minutes: number): string {
        const _hours = Math.floor(minutes / 60);
        const _minutes = Math.ceil(minutes % 60);
        return `${_hours} ч ${_minutes} мин`;
    }

    public static moreOrEqual(d1: Date, d2: Date): boolean {
        return d1 > d2 || this.datesAreEqual(d1, d2);
    }

    public static lessOrEqual(d1: Date, d2: Date): boolean {
        return d1 < d2 || this.datesAreEqual(d1, d2);
    }

    public static datesAreEqual(d1: Date, d2: Date): boolean {
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }

    public static timeIsEqual(d1: Date, d2: Date): boolean {
        return d1.getTime() === d2.getTime();
    }

    public static getCountDaysBetween(d1: Date, d2: Date): number {
        const timeDiff = Math.abs(d1.getTime() - d2.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
}
