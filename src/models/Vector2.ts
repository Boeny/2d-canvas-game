
export class Vector2 {

    public static get up(): Vector2 {
        return new Vector2(0, 1);
    }
    public static get down(): Vector2 {
        return new Vector2(0, -1);
    }
    public static get right(): Vector2 {
        return new Vector2(1, 0);
    }
    public static get left(): Vector2 {
        return new Vector2(-1, 0);
    }

    public static dot(a: Vector2, b: Vector2): number {
        return a.x * b.x + a.y * b.y;
    }

    public x = 0;
    public y = 0;

    constructor(x?: number, y?: number) {

        if (x !== undefined) {
            this.x = x;
        }
        if (y !== undefined) {
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

    public invert(): this {
        return this.multScalar(-1);
    }

    public invertX(): this {
        this.x = -this.x;
        return this;
    }

    public invertY(): this {
        this.y = -this.y;
        return this;
    }

    public add(v: Vector2): this {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    public sub(v: Vector2): this {
        this.add(v.invert());
        return this;
    }

    public mult(v: Vector2): this {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }

    public divScalar(n: number): this {
        if (n === 0) {
            return this;
        }
        this.x /= n;
        this.y /= n;
        return this;
    }

    public multScalar(n: number): this {
        this.x *= n;
        this.y *= n;
        return this;
    }

    public normalize(): this {
        return this.divScalar(this.length);
    }

    public angle(): number {
        return (this.y > 0 ? 1 : -1) * Math.acos(this.x);
    }
    public setAngle(angle: number): this {
        const len = this.length;
        if (len === 0) {
            return this;
        }
        this.x = Math.cos(angle);
        this.y = Math.sin(angle);
        this.multScalar(len);
        return this;
    }

    public rotate(deg: number): this {
        const len = this.length;
        if (len === 0) {
            return this;
        }
        this.divScalar(len);
        this.rotateNormalized(deg);
        this.multScalar(len);
        return this;
    }

    public rotateNormalized(deg: number): this {
        const angle = this.angle() + deg;
        this.x = Math.cos(angle);
        this.y = Math.sin(angle);
        return this;
    }

    public distance(position: Vector2): number {
        return this.clone().sub(position).length;
    }
}
