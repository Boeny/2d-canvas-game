import { observable, action } from "mobx";
import { Vector2 } from "models";
import { VectorHelpers } from "helpers/VectorHelpers";

export interface IActions {
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
    public actions: IActions = {
        up: false,
        down: false,
        left: false,
        right: false,
        createBullet: false
    };

    @observable public position: Vector2;
    @observable public direction: Vector2;

    constructor(
        position: Vector2,
        angle: number,
        private applyInfiniteMovement: (position: Vector2) => Vector2,
        private createBullet: (position: Vector2, direction: Vector2, velocity: Vector2) => void
    ) {
        this.position = position;
        this.direction = Vector2.right.rotateNormalized(angle);
    }

    public onUpdateActions = (data: Partial<IActions>) => {
        this.actions = { ...this.actions, ...data };
    }

    @action
    public onUpdate = (deltaTimeSec: number) => {

        if (this.actions.left) {
            this.direction.rotateNormalized(this.MAX_ROTATION_SPEED * deltaTimeSec);
        }
        else if (this.actions.right) {
            this.direction.rotateNormalized(-this.MAX_ROTATION_SPEED * deltaTimeSec);
        }

        if (this.actions.up) {
            this.velocity.add(this.direction.clone().multScalar(this.ACCELERATION));
        }
        else if (this.actions.down) {
            this.velocity.add(this.direction.clone().multScalar(-this.ACCELERATION));
        }

        this.timeToRecharge += deltaTimeSec;

        if (this.actions.createBullet && (this.timeToRecharge === 0 || this.timeToRecharge > this.RECHARGING_TIME)) {
            this.timeToRecharge = 0;
            this.createBullet(
                VectorHelpers.getTriangleFrontPoint(this.position, this.direction, this.SCALE),
                this.direction,
                this.velocity
            );
            this.velocity.add(this.direction.clone().multScalar(-this.BULLET_RECOIL));
        }

        const length = this.velocity.length;

        if (this.actions.up || this.actions.down || length > 0) {
            this.velocity.length = length > this.FRICTION ? length - this.FRICTION : 0;
            this.position = this.applyInfiniteMovement(this.position.clone().add(this.velocity.clone().multScalar(deltaTimeSec)));
        }
    }
}
