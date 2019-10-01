import React from "react";
import { Vector2 } from "helpers";
import { VectorHelpers } from "helpers/VectorHelpers";
import { containerStore } from "stores/ContainerStore";
import { Triangle } from "./Triangle";

interface IProps {
    position: Vector2;
    direction: Vector2;
    scale: number;
    color: string;
}

export class MovableObject extends React.PureComponent<IProps> {

    private WING_DEVIATION_ANGLE = 3 * Math.PI / 4;

    private leftPoint(position: Vector2, direction: Vector2): Vector2 {
        return position.clone().add(
            direction.clone().rotateNormalized(this.WING_DEVIATION_ANGLE).multScalar(this.props.scale)
        );
    }

    private rightPoint(position: Vector2, direction: Vector2): Vector2 {
        return position.clone().add(
            direction.clone().rotateNormalized(-this.WING_DEVIATION_ANGLE).multScalar(this.props.scale)
        );
    }

    private frontPoint(position: Vector2, direction: Vector2): Vector2 {
        return VectorHelpers.getTriangleFrontPoint(position, direction, this.props.scale);
    }

    render() {

        const { direction, position, color } = this.props;
        if (!containerStore.hasShapeInside(position, this.props.scale)) {
            return null;
        }
        return (
            <Triangle
                a={this.leftPoint(position, direction)}
                b={this.rightPoint(position, direction)}
                c={this.frontPoint(position, direction)}
                color={color}
            />
        );
    }
}
