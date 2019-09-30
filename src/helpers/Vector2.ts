import { isNullOrUndefined } from "util";

export class Vector2 {

    private readonly E = 0.1;

    public static readonly up = new Vector2(0, 1);
    public static readonly down = new Vector2(0, -1);
    public static readonly right = new Vector2(1, 0);
    public static readonly left = new Vector2(-1, 0);

    public static dot(a: Vector2, b: Vector2) {
        return (a.x * b.x + a.y * b.y) / (a.length * b.length);
    }

    public x: number = 0;
    public y: number = 0;

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

    public get dot(): number {
        return this.x / this.length;
    }

    public get sqrLength(): number {
        const result = this.x * this.x + this.y * this.y;
        return result < this.E ? 0 : result;
    }

    public get length(): number {
        const result = Math.sqrt(this.sqrLength);
        return result < this.E ? 0 : result;
    }

    public invert(): Vector2 {
        return new Vector2(-this.x, -this.y);
    }

    public invertX(): Vector2 {
        return new Vector2(-this.x, this.y);
    }

    public invertY(): Vector2 {
        return new Vector2(this.x, -this.y);
    }

    public add(v: Vector2): Vector2 {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    public sub(sub: Vector2): Vector2 {
        const v = this.clone();
        v.selfAdd(sub.invert());
        return v;
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

    public rotate(deg: number): Vector2 {
        const v = this.clone();
        v.selfRotate(deg);
        return v;
    }

    public rotateNormalized(deg: number): Vector2 {
        const v = this.clone();
        v.selfRotateNormalized(deg);
        return v;
    }

    public clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    // Self -----------------------

    public selfInvert() {
        this.selfMultScalar(-1);
    }

    public selfInvertX() {
        this.x = -this.x;
    }

    public selfInvertY() {
        this.y = -this.y;
    }

    public selfAdd(v: Vector2) {
        this.x += v.x;
        this.y += v.y;
    }

    public selfSub(v: Vector2) {
        this.selfAdd(v.invert());
    }

    public selfMult(v: Vector2) {
        this.x *= v.x;
        this.y *= v.y;
    }

    public selfDivScalar(n: number) {
        this.x /= n;
        this.y /= n;
    }

    public selfMultScalar(n: number) {
        this.x *= n;
        this.y *= n;
    }

    public selfNormalize() {
        this.selfDivScalar(this.length);
    }

    public selfRotate(deg: number) {
        const len = this.length;
        this.selfDivScalar(len);
        this.selfRotateNormalized(deg);
        this.selfMultScalar(len);
    }

    public selfRotateNormalized(deg: number) {
        const angle = (this.y > 0 ? 1 : -1) * Math.acos(this.x) + deg;
        this.x = Math.cos(angle);
        this.y = Math.sin(angle);
    }
}
