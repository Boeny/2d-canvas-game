import { isNullOrUndefined } from "util";

export class Vector2 {

    private readonly E = 0.1;

    public static readonly up = new Vector2(0, 1);
    public static readonly down = new Vector2(0, -1);
    public static readonly right = new Vector2(1, 0);
    public static readonly left = new Vector2(-1, 0);

    public readonly x: number = 0;
    public readonly y: number = 0;

    constructor(x?: number, y?: number) {

        if (!isNullOrUndefined(x)) {
            this.x = x;
        }
        if (!isNullOrUndefined(y)) {
            this.y = y;
        }
    }

    public get xy() {
        return { x: this.x, y: this.y };
    }

    public get sqrLength() {
        const result = this.x * this.x + this.y * this.y;
        return result < this.E ? 0 : result;
    }

    public get length() {
        const result = Math.sqrt(this.sqrLength);
        return result < this.E ? 0 : result;
    }

    public add(v: Vector2): Vector2 {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    public invert() {
        return this.multScalar(-1);
    }

    public invertX() {
        return new Vector2(-this.x, this.y);
    }

    public invertY() {
        return new Vector2(this.x, -this.y);
    }

    public sub(v: Vector2): Vector2 {
        return this.add(v.invert());
    }

    public mult(v: Vector2): Vector2 {
        return new Vector2(this.x * v.x, this.y * v.y);
    }

    public divScalar(n: number): Vector2 {
        return new Vector2(this.x / n, this.y / n);
    }

    public multScalar(n: number): Vector2 {
        return new Vector2(this.x * n, this.y * n);
    }

    public normalize(): Vector2 {
        return this.divScalar(this.length);
    }
}
