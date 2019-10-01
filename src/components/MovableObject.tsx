import React from "react";
import { Vector2 } from "helpers";
import { Triangle } from "./Triangle";
import { VectorHelpers } from "helpers/VectorHelpers";

interface IProps {
    position: Vector2;
    direction: Vector2;
    areaWidth: number;
    areaHeight: number;
    scale: number;
    color: string;
}

export class MovableObject extends React.PureComponent<IProps> {

    private SCALE = this.props.scale;
    private WING_DEVIATION_ANGLE = 3 * Math.PI / 4;

    private leftPoint(position: Vector2, direction: Vector2): Vector2 {
        return position.clone().add(
            direction.clone().rotateNormalized(this.WING_DEVIATION_ANGLE).multScalar(this.SCALE)
        );
    }

    private rightPoint(position: Vector2, direction: Vector2): Vector2 {
        return position.clone().add(
            direction.clone().rotateNormalized(-this.WING_DEVIATION_ANGLE).multScalar(this.SCALE)
        );
    }

    private frontPoint(position: Vector2, direction: Vector2): Vector2 {
        return VectorHelpers.getTriangleFrontPoint(position, direction, this.SCALE);
    }

    private isInArea(point: Vector2): boolean {
        return point.x > -this.SCALE && point.x < this.props.areaWidth + this.SCALE &&
            point.y > -this.SCALE && point.y < this.props.areaHeight + this.SCALE;
    }

    render() {

        const { direction, position, color } = this.props;
        if (!this.isInArea(position)) {
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
