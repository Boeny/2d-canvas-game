import React from "react";
import { ActiveComponent } from "models/ActiveComponent";
import { KeysType } from "enums/KeysType";
import { Vector2 } from "helpers";
import { Quad } from "./Quad";
import { VectorHelpers } from "helpers/VectorHelpers";
import { containerStore } from "stores/ContainerStore";

interface IProps {
    createBullet: (position: Vector2, direction: Vector2, initialVelocity: Vector2) => void;
}

interface IState {
    position: Vector2;
    direction: Vector2;
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
}

export class Player extends ActiveComponent<IProps> {

    private SCALE = 20;
    private ACCELERATION = 0.1;
    private MAX_ROTATION_SPEED = 0.1;
    private FRICTION = 0.02;

    private velocity = new Vector2();
    private currentItemPosition = new Vector2();
    private gameState: IState = {
        position: new Vector2(),
        direction: Vector2.up,
        up: false,
        down: false,
        left: false,
        right: false
    };

    private setGameState(data: Partial<IState>) {
        this.gameState = { ...this.gameState, ...data };
    }

    public onKeyDown = (e: KeyboardEvent) => {
        let { up, down, left, right } = this.gameState;

        switch (e.keyCode) {
            case KeysType.up: up = true; down = false; break;
            case KeysType.down: down = true; up = false; break;
            case KeysType.left: left = true; right = false; break;
            case KeysType.right: right = true; left = false; break;
            case KeysType.space: this.props.createBullet(this.currentItemPosition, this.gameState.direction, this.velocity); break;
        }
        this.setGameState({ up, down, left, right });
    }

    public onKeyUp = (e: KeyboardEvent) => {
        let { up, down, left, right } = this.gameState;

        switch (e.keyCode) {
            case KeysType.up: up = false; break;
            case KeysType.down: down = false; break;
            case KeysType.left: left = false; break;
            case KeysType.right: right = false; break;
        }
        this.setGameState({ up, down, left, right });
    }

    public onGameLoop = () => {
        const { up, down, left, right, direction } = this.gameState;

        if (left) {
            direction.rotateNormalized(this.MAX_ROTATION_SPEED);
        }
        else
        if (right) {
            direction.rotateNormalized(-this.MAX_ROTATION_SPEED);
        }

        if (up) {
            this.velocity.add(direction.clone().multScalar(this.ACCELERATION));
        }
        else
        if (down) {
            this.velocity.add(direction.clone().multScalar(-this.ACCELERATION));
        }

        if (up || down || left || right || this.velocity.length > 0) {
            this.velocity.sub(this.velocity.clone().normalize().multScalar(this.FRICTION));
            const position = containerStore.applyInfiniteMovement(this.gameState.position.clone().add(this.velocity));
            this.setCurrentItemPosition(position);
            this.setGameState({ position, direction });
        }
    }

    setCurrentItemPosition(position: Vector2) {

        const halfWidth = containerStore.halfWidth;
        const halfHeight = containerStore.halfHeight;
        const frontPoint = VectorHelpers.getTriangleFrontPoint(position, this.gameState.direction, this.SCALE);

        this.currentItemPosition.x = frontPoint.x + (frontPoint.x < halfWidth ? halfWidth : -halfWidth);
        this.currentItemPosition.y = frontPoint.y + (frontPoint.y < halfHeight ? halfHeight : -halfHeight);
    }

    public render() {
        return (
            <Quad
                scale={this.SCALE}
                color="green"
                center={this.gameState.position}
                direction={this.gameState.direction}
            />
        );
    }
}
