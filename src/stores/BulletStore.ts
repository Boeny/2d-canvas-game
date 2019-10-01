import { observable, action } from "mobx";
import { Vector2 } from "helpers";
import { containerStore } from "stores/ContainerStore";

export interface IBullet {
    position: Vector2;
    velocity: Vector2;
    direction: Vector2;
}

class BulletStore {

    private SPEED = 7;

    @observable
    public bullets: IBullet[] = [];

    @action
    public createBullet(position: Vector2, direction: Vector2, initialVelocity: Vector2) {
        this.bullets.push({
            position: position.clone(),
            velocity: initialVelocity.clone().add(direction.clone().multScalar(this.SPEED)),
            direction: direction.clone()
        });
    }

    @action
    public move(bullet: IBullet) {
        bullet.position = containerStore.applyInfiniteMovement(bullet.position.clone().add(bullet.velocity));

        if (!containerStore.hasPointInside(bullet.position)) {
            this.bullets.splice(this.bullets.indexOf(bullet), 1);
        }
    }
}

export const bulletStore = new BulletStore();
