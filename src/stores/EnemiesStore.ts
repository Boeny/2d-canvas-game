import { EnemyStore } from "./EnemyStore";
import { Vector2 } from "models";
import { VectorHelpers } from "helpers/VectorHelpers";
import { Helpers } from "helpers";

export class EnemiesStore {

    public COUNT = 1;
    public data: EnemyStore[];

    constructor(
        width: number,
        height: number,
        applyInfiniteMovement: (position: Vector2, radius: number) => Vector2,
        createBullet: (position: Vector2, direction: Vector2, velocity: Vector2) => void
    ) {
        this.data = Helpers.range(this.COUNT).map(() => {
            return new EnemyStore(
                VectorHelpers.random(width, height),
                Helpers.random(0, Math.PI * 2),
                applyInfiniteMovement,
                createBullet
            );
        });
    }
}
