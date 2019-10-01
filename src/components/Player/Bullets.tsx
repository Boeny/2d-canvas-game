import React from "react";
import { Vector2 } from "helpers";
import { MovableObject } from "./MovableObject";

interface IProps {
    center: Vector2;
    direction: Vector2;
    areaWidth: number;
    areaHeight: number;
}

export class Bullets extends React.PureComponent<IProps> {

    render() {

        const { direction, areaWidth, areaHeight } = this.props;

        return (
            <>
                {[].map((point, i) =>
                    <MovableObject
                        key={i}
                        center={point}
                        direction={direction}
                        areaWidth={areaWidth}
                        areaHeight={areaHeight}
                        color="red"
                        scale={5}
                    />
                )}
            </>
        );
    }
}
