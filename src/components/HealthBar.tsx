import React from "react";
import { Rect } from "react-konva";
import { Vector2 } from "models";
import { Helpers } from "helpers";

interface IProps {
    health: number;
    maxHealth: number;
    position: Vector2;
}

export class HealthBar extends React.PureComponent<IProps> {

    MAX_LENGTH = 40;

    public render() {

        const { health, maxHealth, position } = this.props;
        const width = Helpers.lerp(0, this.MAX_LENGTH, 0, maxHealth, health);

        return (
            <Rect
                fill="red"
                stroke="black"
                strokeWidth={1}
                x={position.x - width / 2}
                y={window.innerHeight - position.y}
                width={width}
                height={3}
            />
        );
    }
}
