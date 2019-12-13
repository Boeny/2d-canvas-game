import { Vector2 } from "./Vector2";

export class Planet {

    constructor(
        public id: number,
        public position: Vector2,
        public radius: number
    ) {}
}
