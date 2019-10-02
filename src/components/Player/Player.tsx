import React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { containerStore } from "stores/ContainerStore";
import { ActiveComponent } from "models/ActiveComponent";
import { KeysType } from "enums/KeysType";
import { Vector2 } from "helpers";
import { VectorHelpers } from "helpers/VectorHelpers";
import { MovableObject } from "../MovableObject";

interface IProps {
    position: Vector2;
    createBullet: (position: Vector2, direction: Vector2, initialVelocity: Vector2) => void;
}

interface IState {
    position: Vector2;
    direction: Vector2;
}

@observer
export class Player extends ActiveComponent<IProps> {

    private SCALE = 20;
    private ACCELERATION = 10;
    private MAX_ROTATION_SPEED = 10;
    private FRICTION = 2;
    private RECHARGING_TIME = 0.1;
    private BULLET_RECOIL = 50;

    private velocity = new Vector2();
    private up = false;
    private down = false;
    private left = false;
    private right = false;
    private createBullet = false;
    private timeToRecharge = 0;

    @observable
    private gameState: IState = {
        position: this.props.position,
        direction: Vector2.up
    };

    @action
    private setGameState(data: Partial<IState>) {
        this.gameState = { ...this.gameState, ...data };
    }

    public onKeyDown = (e: KeyboardEvent) => {
        switch (e.keyCode) {
            case KeysType.up: this.up = true; this.down = false; break;
            case KeysType.down: this.down = true; this.up = false; break;
            case KeysType.left: this.left = true; this.right = false; break;
            case KeysType.right: this.right = true; this.left = false; break;
            case KeysType.space: this.createBullet = true; break;
        }
    }

    public onKeyUp = (e: KeyboardEvent) => {
        switch (e.keyCode) {
            case KeysType.up: this.up = false; break;
            case KeysType.down: this.down = false; break;
            case KeysType.left: this.left = false; break;
            case KeysType.right: this.right = false; break;
            case KeysType.space: this.createBullet = false; break;
        }
    }

    public onGameLoop = (deltaTimeSec: number) => {
        const { position, direction } = this.gameState;

        if (this.left) {
            direction.rotateNormalized(this.MAX_ROTATION_SPEED * deltaTimeSec);
        }
        else
        if (this.right) {
            direction.rotateNormalized(-this.MAX_ROTATION_SPEED * deltaTimeSec);
        }

        if (this.up) {
            this.velocity.add(direction.clone().multScalar(this.ACCELERATION));
        }
        else
        if (this.down) {
            this.velocity.add(direction.clone().multScalar(-this.ACCELERATION));
        }

        this.timeToRecharge += deltaTimeSec;
        if (this.createBullet && (this.timeToRecharge === 0 || this.timeToRecharge > this.RECHARGING_TIME)) {
            this.timeToRecharge = 0;
            this.props.createBullet(
                VectorHelpers.getTriangleFrontPoint(position, direction, this.SCALE),
                direction,
                this.velocity
            );
            this.velocity.add(direction.clone().multScalar(-this.BULLET_RECOIL));
        }

        if (this.up || this.down || this.left || this.right || this.velocity.length > 0) {
            this.velocity.sub(this.velocity.clone().normalize().multScalar(this.FRICTION));
            this.setGameState({
                position: containerStore.applyInfiniteMovement(position.clone().add(this.velocity.clone().multScalar(deltaTimeSec))),
                direction
            });
        }
    }

    public render() {
        return (
            <MovableObject
                scale={this.SCALE}
                color="green"
                position={this.gameState.position}
                direction={this.gameState.direction}
            />
        );
    }
}
