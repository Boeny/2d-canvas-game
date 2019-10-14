import { Vector2 } from "./Vector2";

export class Line2 {

    protected k: number;
    protected b: number;

    public static fromVector(v: Vector2): Line2 {
        return new Line2(0, 0, v.x, v.y);
    }

    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.b = (y1 * x2 - y2 * x1) / (x1 - x2);
        this.k = (y1 - this.b) / x1;
    }

    /** returns X if this K !== 0 */
    public getX(y: number): number {
        return (y - this.b) / this.k;
    }

    public intersection(line: Line2): Vector2 | null {
        // same angle
        if (this.k === line.k) {
            return null;
        }
        if (this.k !== 0 && line.k === 0) {
            return new Vector2(this.getX(line.b), line.b);
        }
        if (this.k === 0 && line.k !== 0) {
            return new Vector2(line.getX(this.b), this.b);
        }
        const y = (line.k * this.b / this.k - line.b) / (line.k / this.k - 1);
        return new Vector2(this.getX(y), y);
    }
}
