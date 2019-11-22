import React from "react";
import { Vector2 } from "models";
import { Helpers } from "helpers";
import { Rect } from "./figures";

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
                color="red"
                borderColor="black"
                position={new Vector2(position.x - width / 2, position.y)}
                width={width}
                height={3}
            />
        );
    }
}
