import React from "react";
import { Vector2 } from "helpers";
import { MovableObject } from "./MovableObject";
import { Bullets } from "./Bullets";

interface IProps {
    center: Vector2;
    direction: Vector2;
    areaWidth: number;
    areaHeight: number;
}

export class Quad extends React.PureComponent<IProps> {

    private get points(): Vector2[] {

        const { areaWidth, areaHeight, center } = this.props;
        const halfWidth = areaWidth / 2;
        const halfHeight = areaHeight / 2;

        return [
            new Vector2(center.x - halfWidth, center.y - halfHeight),
            new Vector2(center.x + halfWidth, center.y - halfHeight),
            new Vector2(center.x - halfWidth, center.y + halfHeight),
            new Vector2(center.x + halfWidth, center.y + halfHeight)
        ];
    }

    render() {

        const { direction, areaWidth, areaHeight } = this.props;

        return (
            <>
                {this.points.map((point, i) =>
                    <React.Fragment key={i}>
                        <MovableObject
                            center={point}
                            direction={direction}
                            areaWidth={areaWidth}
                            areaHeight={areaHeight}
                            color="green"
                            scale={20}
                        />
                        <Bullets
                            center={point}
                            direction={direction}
                            areaWidth={areaWidth}
                            areaHeight={areaHeight}
                        />
                    </React.Fragment>
                )}
            </>
        );
    }
}
