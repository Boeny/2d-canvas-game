import React from "react";
import { observer } from "mobx-react";
import { Vector2 } from "helpers";
import { containerStore } from "stores/ContainerStore";
import { MovableObject } from "../MovableObject";

interface IProps {
    scale: number;
    color: string;
    center: Vector2;
    direction: Vector2;
}

@observer
export class Quad extends React.PureComponent<IProps> {

    private get points(): Vector2[] {

        const { center } = this.props;
        const halfWidth = containerStore.halfWidth;
        const halfHeight = containerStore.halfHeight;

        return [
            new Vector2(center.x - halfWidth, center.y - halfHeight),
            new Vector2(center.x + halfWidth, center.y - halfHeight),
            new Vector2(center.x - halfWidth, center.y + halfHeight),
            new Vector2(center.x + halfWidth, center.y + halfHeight)
        ];
    }

    render() {

        const { direction, color } = this.props;

        return (
            <>
                {this.points.map((point, i) =>
                    <MovableObject
                        key={i}
                        position={point}
                        direction={direction}
                        color={color}
                        scale={this.props.scale}
                    />
                )}
            </>
        );
    }
}
