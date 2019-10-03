import React from "react";
import { observer } from "mobx-react";
import { EnemyStore } from "stores/EnemyStore";
import { Vector2 } from "models";
import { GameObjectComponent } from "../GameObjectComponent";
import { ScaledTriangle } from "../ScaledTriangle";

interface IComponentProps {
    scale: number;
    position: Vector2;
    direction: Vector2;
    onUpdate: (deltaTimeSec: number) => void;
}

export class EnemyComponent extends GameObjectComponent<IComponentProps> {

    public onGameLoop = (deltaTimeSec: number) => {
        this.props.onUpdate(deltaTimeSec);
    }

    public render() {
        return (
            <ScaledTriangle
                scale={this.props.scale}
                color="red"
                position={this.props.position}
                direction={this.props.direction}
            />
        );
    }
}

export interface IProps {
    width: number;
    height: number;
    applyInfiniteMovement: (position: Vector2) => Vector2;
    createBullet: (position: Vector2, direction: Vector2, velocity: Vector2) => void;
}

@observer
export class Enemy extends React.PureComponent<IProps> {

    store = new EnemyStore(this.props.width, this.props.height, this.props.applyInfiniteMovement, this.props.createBullet);

    render() {
        return (
            <EnemyComponent
                scale={this.store.SCALE}
                position={this.store.position}
                direction={this.store.direction}
                onUpdate={this.store.onUpdate}
            />
        );
    }
}
