import { EnemyStore } from "./EnemyStore";
import { Vector2 } from "models";
import { Helpers } from "helpers";
import { IBaseBullet } from "interfaces";

export class EnemiesStore {

    public COUNT = 1;
    public data: EnemyStore[];

    constructor(
        getRandomPosition: () => Vector2,
        applyInfiniteMovement: (position: Vector2) => Vector2,
        createBullet: (bullet: IBaseBullet) => void
    ) {
        this.data = Helpers.range(this.COUNT).map(() => {
            return new EnemyStore(
                getRandomPosition(),
                Helpers.random(0, Math.PI * 2),
                applyInfiniteMovement,
                createBullet
            );
        });
    }
}
