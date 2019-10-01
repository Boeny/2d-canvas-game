import React from "react";
import { Vector2 } from "helpers";
import { Triangle } from "../Triangle";

interface IProps {
    center: Vector2;
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
        return position.clone().add(direction.clone().multScalar(this.SCALE));
    }

    private isPointOnScreen(point: Vector2) {
        return point.x > -this.SCALE && point.x < this.props.areaWidth + this.SCALE &&
            point.y > -this.SCALE && point.y < this.props.areaHeight + this.SCALE;
    }

    render() {

        const { direction, center, color } = this.props;
        if (!this.isPointOnScreen(center)) {
            return null;
        }
        return (
            <Triangle
                a={this.leftPoint(center, direction)}
                b={this.rightPoint(center, direction)}
                c={this.frontPoint(center, direction)}
                color={color}
            />
        );
    }
}
