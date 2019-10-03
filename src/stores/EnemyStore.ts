import { PlayerStore } from "./PlayerStore";
import { Vector2 } from "models";
import { VectorHelpers } from "helpers/VectorHelpers";
import { Helpers } from "helpers";

export class EnemyStore extends PlayerStore {

    constructor(
        width: number,
        height: number,
        applyInfiniteMovement: (position: Vector2) => Vector2,
        createBullet: (position: Vector2, direction: Vector2, velocity: Vector2) => void
    ) {
        super(VectorHelpers.random(width, height), Helpers.random(0, Math.PI * 2), applyInfiniteMovement, createBullet);
    }
}
