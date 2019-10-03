import { observable, action } from "mobx";
import { Vector2 } from "models";
import { VectorHelpers } from "helpers/VectorHelpers";

export interface IKeyEvents {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    createBullet: boolean;
}

export class PlayerStore {

    public SCALE = 20;
    private ACCELERATION = 10;
    private MAX_ROTATION_SPEED = 10;
    private FRICTION = 2;
    private RECHARGING_TIME = 0.1;
    private BULLET_RECOIL = 50;

    private velocity = new Vector2();
    private timeToRecharge = 0;

    @observable public position = new Vector2();
    @observable public direction = Vector2.up;

    constructor(
        position: Vector2,
        private applyInfiniteMovement: (position: Vector2) => Vector2,
        private createBullet: (position: Vector2, direction: Vector2, velocity: Vector2) => void
    ) {
        this.position = position;
    }

    @action
    public onUpdate = (deltaTimeSec: number, events: IKeyEvents) => {

        if (events.left) {
            this.direction.rotateNormalized(this.MAX_ROTATION_SPEED * deltaTimeSec);
        }
        else
        if (events.right) {
            this.direction.rotateNormalized(-this.MAX_ROTATION_SPEED * deltaTimeSec);
        }

        if (events.up) {
            this.velocity.add(this.direction.clone().multScalar(this.ACCELERATION));
        }
        else
        if (events.down) {
            this.velocity.add(this.direction.clone().multScalar(-this.ACCELERATION));
        }

        this.timeToRecharge += deltaTimeSec;

        if (events.createBullet && (this.timeToRecharge === 0 || this.timeToRecharge > this.RECHARGING_TIME)) {
            this.timeToRecharge = 0;
            this.createBullet(
                VectorHelpers.getTriangleFrontPoint(this.position, this.direction, this.SCALE),
                this.direction,
                this.velocity
            );
            this.velocity.add(this.direction.clone().multScalar(-this.BULLET_RECOIL));
        }

        const length = this.velocity.length;

        if (events.up || events.down || length > 0) {
            this.velocity.length = length > this.FRICTION ? length - this.FRICTION : 0;
            this.position = this.applyInfiniteMovement(this.position.clone().add(this.velocity.clone().multScalar(deltaTimeSec)));
        }
    }
}
