import { observable, action } from "mobx";
import { IBaseBullet, IBullet } from "interfaces";

export class BulletStore {

    public SCALE = 5;
    private SPEED = 800;
    private TIME_TO_LIVE = 2;
    private DAMAGE = 20;

    private index = 0;

    @observable
    public bullets: IBullet[] = [];

    @action
    public createBullet = (o: IBaseBullet) => {
        this.bullets.push({
            ...o,
            velocity: o.velocity.clone().add(o.direction.clone().multScalar(this.SPEED)),
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
        bullet.position = bullet.position.clone().add(bullet.velocity.clone().multScalar(deltaTimeSec));
    }

    @action
    public remove = (id: number) => {
        this.bullets = this.bullets.filter(b => b.id !== id);
    }
}
