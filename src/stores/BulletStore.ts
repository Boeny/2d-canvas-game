import { observable, action } from "mobx";
import { Vector2 } from "models";

interface CommonObject {
    type: "player" | "enemy";
    position: Vector2;
    direction: Vector2;
    velocity: Vector2;
}

export interface IBullet extends CommonObject {
    time: number;
    id: number;
    damage: number;
    radius: number;
}

export class BulletStore {

    public SCALE = 5;
    private SPEED = 800;
    private TIME_TO_LIVE = 2;
    private DAMAGE = 20;

    private index = 0;

    @observable
    public bullets: IBullet[] = [];

    constructor(
        private applyInfiniteMovement: (position: Vector2, radius: number) => Vector2
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
            damage: this.DAMAGE,
            radius: this.SCALE
        });
        this.index += 1;
    }

    @action
    public move = (bullet: IBullet,  deltaTimeSec: number) => {
        bullet.time += deltaTimeSec;

        if (bullet.time > this.TIME_TO_LIVE) {
            this.remove(bullet.id);
            return;
        }
        bullet.position = this.applyInfiniteMovement(bullet.position.clone().add(bullet.velocity.clone().multScalar(deltaTimeSec)), this.SCALE);
    }

    @action
    public remove = (id: number) => {
        this.bullets = this.bullets.filter(b => b.id !== id);
    }
}
