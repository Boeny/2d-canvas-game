import { observable, action, runInAction } from "mobx";
import { Vector2 } from "models";
import { VectorHelpers } from "helpers/VectorHelpers";
import { IBaseBullet } from "interfaces";

export interface IActions {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    createBullet: boolean;
    takeDamage: number;
}

export class PlayerStore {

    public radius = 5;
    private ACCELERATION = 10;
    private MAX_ROTATION_SPEED = 10;
    private FRICTION = 0;
    private RECHARGING_TIME = 0.2;
    private BULLET_RECOIL = 30;
    public MAX_HEALTH = 100;
    private ENERGY_FOR_LIFE = 5;
    private ENERGY_FOR_ROTATE = 7;
    private ENERGY_FOR_MOVE = 10;
    private ENERGY_FOR_SHOT = 15;

    private velocity = new Vector2();
    private timeToRecharge = 0;
    public actions: IActions = {
        up: false,
        down: false,
        left: false,
        right: false,
        createBullet: false,
        takeDamage: 0
    };

    @observable public position = new Vector2();
    @observable public direction = new Vector2();
    @observable public health = this.MAX_HEALTH;

    constructor(
        position: Vector2,
        angle: number,
        private createBullet: (bullet: IBaseBullet) => void
    ) {
        this.setPositionAndDirection(position, angle);
    }

    @action
    public setPositionAndDirection(position: Vector2, angle: number) {
        this.position = position;
        this.direction = Vector2.right.rotateNormalized(angle);
    }

    private decreaseLengthBy(length: number, delta: number): number {
        return length > delta ? length - delta : 0;
    }

    private increaseHealthBy(length: number, delta: number): number {
        return length + delta < this.MAX_HEALTH ? length + delta : this.MAX_HEALTH;
    }

    public updateActions = (data: Partial<IActions>) => {
        this.actions = { ...this.actions, ...data };
    }

    @action
    private updateAction(deltaTimeSec: number) {

        // this.health = this.decreaseLengthBy(this.health, this.ENERGY_FOR_LIFE * deltaTimeSec);

        if (this.actions.takeDamage > 0) {
            this.health = this.decreaseLengthBy(this.health, this.actions.takeDamage);
            this.actions.takeDamage = 0;
        }

        if (this.actions.left) {
            this.direction = this.direction.clone().rotateNormalized(this.MAX_ROTATION_SPEED * deltaTimeSec);
            // this.health = this.decreaseLengthBy(this.health, this.ENERGY_FOR_ROTATE * deltaTimeSec);
        }
        else if (this.actions.right) {
            this.direction = this.direction.clone().rotateNormalized(-this.MAX_ROTATION_SPEED * deltaTimeSec);
            // this.health = this.decreaseLengthBy(this.health, this.ENERGY_FOR_ROTATE * deltaTimeSec);
        }

        if (this.actions.up) {
            this.velocity.add(this.direction.clone().multScalar(this.ACCELERATION));
            // this.health = this.decreaseLengthBy(this.health, this.ENERGY_FOR_MOVE * deltaTimeSec);
        }
        else if (this.actions.down) {
            this.velocity.add(this.direction.clone().multScalar(-this.ACCELERATION));
            // this.health = this.decreaseLengthBy(this.health, this.ENERGY_FOR_MOVE * deltaTimeSec);
        }

        this.timeToRecharge += deltaTimeSec;

        if (this.actions.createBullet && (this.timeToRecharge === 0 || this.timeToRecharge > this.RECHARGING_TIME)) {
            this.timeToRecharge = 0;
            this.createBullet({
                type: "player",
                position: VectorHelpers.getTriangleFrontPoint(this.position, this.direction, this.radius),
                direction: this.direction.clone(),
                velocity: this.velocity.clone()
            });
            this.velocity.add(this.direction.clone().multScalar(-this.BULLET_RECOIL));
            // this.health = this.decreaseLengthBy(this.health, this.ENERGY_FOR_SHOT);
        }

        const length = this.velocity.length;

        if (length > 0) {
            this.velocity.length = this.decreaseLengthBy(length, this.FRICTION);
            this.position = this.position.clone().add(this.velocity.clone().multScalar(deltaTimeSec));
        }
    }

    public onUpdate(deltaTimeSec: number) {
        this.updateAction(deltaTimeSec);
    }

    public onCollide(food: number) {
        if (food > 0) {
            runInAction(() => this.health = this.increaseHealthBy(this.health, food));
        }
    }

    public inArea(position: Vector2, radius: number): boolean {
        return this.position.distance(position) < this.radius + radius;
    }
}
