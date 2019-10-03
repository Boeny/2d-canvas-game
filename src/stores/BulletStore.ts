import { observable, action } from "mobx";
import { Vector2 } from "models";

export interface IBullet {
    type: "player" | "enemy";
    position: Vector2;
    velocity: Vector2;
    direction: Vector2;
    time: number;
    id: number;
    damage: number;
}

export class BulletStore {

    private SPEED = 800;
    private TIME_TO_LIVE = 3;
    private DAMAGE = 20;

    private index = 0;

    @observable
    public bullets: IBullet[] = [];

    constructor(
        private applyInfiniteMovement: (position: Vector2) => Vector2,
        private hasCollisionWith: (bullet: IBullet) => boolean
    ) {}

    @action
    public createBullet = (type: "player" | "enemy", position: Vector2, direction: Vector2, initialVelocity: Vector2) => {
        this.bullets.push({
            type,
            position: position.clone(),
            velocity: initialVelocity.clone().add(direction.clone().multScalar(this.SPEED)),
            direction: direction.clone(),
            time: 0,
            id: this.index,
            damage: this.DAMAGE
        });
        this.index += 1;
    }

    @action
    public onUpdate = (bullet: IBullet,  deltaTimeSec: number) => {
        bullet.time += deltaTimeSec;

        if (bullet.time > this.TIME_TO_LIVE) {// || this.hasCollisionWith(bullet)) {
            this.bullets.splice(this.bullets.findIndex(b => b.id === bullet.id), 1);
            return;
        }
        bullet.position = this.applyInfiniteMovement(bullet.position.clone().add(bullet.velocity.clone().multScalar(deltaTimeSec)));
    }
}
