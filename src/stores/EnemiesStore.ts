import { Vector2 } from "models";
import { Helpers } from "helpers";
import { EnemyStore } from "./EnemyStore";

export class EnemiesStore {

    public COUNT = 1;
    public data: EnemyStore[];

    constructor(
        width: number,
        height: number,
        applyInfiniteMovement: (position: Vector2) => Vector2,
        createBullet: (position: Vector2, direction: Vector2, velocity: Vector2) => void
    ) {
        this.data = Helpers.range(this.COUNT).map(() => new EnemyStore(width, height, applyInfiniteMovement, createBullet));
    }
}
