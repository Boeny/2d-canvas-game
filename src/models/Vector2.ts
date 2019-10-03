import { isNullOrUndefined } from "util";

export class Vector2 {

    public static get up() {
        return new Vector2(0, 1);
    }
    public static get down() {
        return new Vector2(0, -1);
    }
    public static get right() {
        return new Vector2(1, 0);
    }
    public static get left() {
        return new Vector2(-1, 0);
    }

    public static dot(a: Vector2, b: Vector2) {
        return a.x * b.x + a.y * b.y;
    }

    public x = 0;
    public y = 0;

    constructor(x?: number, y?: number) {

        if (!isNullOrUndefined(x)) {
            this.x = x;
        }
        if (!isNullOrUndefined(y)) {
            this.y = y;
        }
    }

    public get sqrLength(): number {
        return this.x * this.x + this.y * this.y;
    }

    public get length(): number {
        return Math.sqrt(this.sqrLength);
    }
    public set length(length: number) {
        this.normalize().multScalar(length);
    }

    public clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    // Self -----------------------

    public invert() {
        this.multScalar(-1);
        return this;
    }

    public invertX() {
        this.x = -this.x;
        return this;
    }

    public invertY() {
        this.y = -this.y;
        return this;
    }

    public add(v: Vector2) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    public sub(v: Vector2) {
        this.add(v.invert());
        return this;
    }

    public mult(v: Vector2) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }

    public divScalar(n: number) {
        if (n === 0) {
            return this;
        }
        this.x /= n;
        this.y /= n;
        return this;
    }

    public multScalar(n: number) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    public normalize() {
        return this.divScalar(this.length);
    }

    public rotate(deg: number) {
        const len = this.length;
        if (len === 0) {
            return this;
        }
        this.divScalar(len);
        this.rotateNormalized(deg);
        this.multScalar(len);
        return this;
    }

    public rotateNormalized(deg: number) {
        const angle = (this.y > 0 ? 1 : -1) * Math.acos(this.x) + deg;
        this.x = Math.cos(angle);
        this.y = Math.sin(angle);
        return this;
    }

    public distance(position: Vector2): number {
        return this.clone().sub(position).length;
    }
}
