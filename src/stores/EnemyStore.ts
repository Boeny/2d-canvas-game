import { PlayerStore } from "./PlayerStore";
import { Vector2 } from "models";

export class EnemyStore extends PlayerStore {

    constructor(
        position: Vector2,
        angle: number,
        applyInfiniteMovement: (position: Vector2) => Vector2,
        createBullet: (position: Vector2, direction: Vector2, velocity: Vector2) => void
    ) {
        super(position, angle, applyInfiniteMovement, createBullet);
    }
}
