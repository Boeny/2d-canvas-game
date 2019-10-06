import { observable, action } from "mobx";
import { Vector2 } from "models";
import { PlayerStore } from "./PlayerStore";

interface CommonObject {
    type: "player" | "enemy";
    position: Vector2;
    direction: Vector2;
    velocity: Vector2;
    hasCollision: (bullet: IBullet) => PlayerStore | undefined;
    onCollide: (bullet: IBullet, p: PlayerStore) => void;
}

export interface IBullet extends CommonObject {
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
        private applyInfiniteMovement: (position: Vector2) => Vector2
    ) {}

    @action
    public createBullet = (o: CommonObject) => {
        this.bullets.push({
            ...o,
            position: o.position.clone(),
            velocity: o.velocity.clone().add(o.direction.clone().multScalar(this.SPEED)),
            direction: o.direction.clone(),
            time: 0,
            id: this.index,
            damage: this.DAMAGE
        });
        this.index += 1;
    }

    @action
    public onUpdate = (bullet: IBullet,  deltaTimeSec: number) => {
        bullet.time += deltaTimeSec;

        if (bullet.time > this.TIME_TO_LIVE) {
            this.bullets = this.bullets.filter(b => b.id !== bullet.id);
            return;
        }
        const collider = bullet.hasCollision(bullet);
        if (collider) {
            // this.bullets = this.bullets.filter(b => b.id !== bullet.id);
            bullet.onCollide(bullet, collider);
            return;
        }
        bullet.position = this.applyInfiniteMovement(bullet.position.clone().add(bullet.velocity.clone().multScalar(deltaTimeSec)));
    }
}
