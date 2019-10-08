import { Vector2 } from "models";

export interface IBaseBullet {
    type: "player" | "enemy";
    position: Vector2;
    direction: Vector2;
    velocity: Vector2;
}

export interface IBullet extends IBaseBullet {
    time: number;
    id: number;
    damage: number;
    radius: number;
}
