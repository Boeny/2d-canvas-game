import React from "react";
import { Vector2 } from "models";
import { GameObjectComponent } from "../GameObjectComponent";
import { ScaledTriangle } from "../ScaledTriangle";

interface IProps {
    scale: number;
    position: Vector2;
    direction: Vector2;
    onUpdate: (deltaTimeSec: number) => void;
}

export class Enemy extends GameObjectComponent<IProps> {

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
