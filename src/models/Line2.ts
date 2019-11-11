import { Vector2 } from "./Vector2";

export class Line2 {

    public k: number | null;
    public b: number;

    public static fromVector(v: Vector2): Line2 {
        return new Line2(0, 0, v.x, v.y);
    }

    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.b = x1 === 0 ? y1 : x2 === 0 ? y2 : (y1 * x2 - y2 * x1) / (x1 - x2);
        this.k = x1 === 0 && x2 === 0 ? null : x1 === 0 ? (y2 - this.b) / x2 : (y1 - this.b) / x1;
    }

    /** returns X if this K !== 0 */
    public getX(y: number): number | null {
        return this.k === null || this.k === 0 ? null : (y - this.b) / this.k;
    }

    public intersection(line: Line2): Vector2 | null {
        // same angle
        if (this.k === line.k) {
            return null;
        }
        if (this.k && line.k === 0) {
            return new Vector2(this.getX(line.b)!, line.b);
        }
        if (this.k === 0 && line.k) {
            return new Vector2(line.getX(this.b)!, this.b);
        }
        if (line.k === null || this.k === null) {
            return null;
        }
        const y = (line.k * this.b / this.k - line.b) / (line.k / this.k - 1);
        const x = this.getX(y);
        if (x === null) {
            return null;
        }
        return new Vector2(x, y);
    }
}
