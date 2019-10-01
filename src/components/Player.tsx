import React from "react";
import { ActiveComponent } from "models/ActiveComponent";
import { KeysType } from "enums/KeysType";
import { Vector2 } from "helpers";
import { Triangle } from "./Triangle";

interface IQuadProps extends IProps {
    center: Vector2;
    direction: Vector2;
}

class Quad extends React.PureComponent<IQuadProps> {

    private SCALE = 20;
    private WING_DEVIATION_ANGLE = 3 * Math.PI / 4;

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

        const { direction } = this.props;

        return (
            <>
                {this.points.map((point, i) =>
                    this.isPointOnScreen(point) ?
                        <Triangle
                            key={i}
                            a={this.leftPoint(point, direction)}
                            b={this.rightPoint(point, direction)}
                            c={this.frontPoint(point, direction)}
                            color="green"
                        />
                        : null
                )}
            </>
        );
    }
}

interface IProps {
    areaWidth: number;
    areaHeight: number;
}

interface IState {
    position: Vector2;
    direction: Vector2;
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
}

export class Player extends ActiveComponent<IProps, IState> {

    private ACCELERATION = 0.1;
    private MAX_ROTATION_SPEED = 0.1;
    private FRICTION = 0.02;

    private velocity = new Vector2();

    constructor(props: IProps) {
        super(props);
        this.state = {
            position: new Vector2(),
            direction: Vector2.up,
            up: false,
            down: false,
            left: false,
            right: false
        };
        this.setActive();
    }

    public onKeyDown = (e: KeyboardEvent) => {
        let { up, down, left, right } = this.state;
        switch (e.keyCode) {
            case KeysType.up: up = true; down = false; break;
            case KeysType.down: down = true; up = false; break;
            case KeysType.left: left = true; right = false; break;
            case KeysType.right: right = true; left = false; break;
        }
        this.setState({ up, down, left, right });
    }

    public onKeyUp = (e: KeyboardEvent) => {
        let { up, down, left, right } = this.state;
        switch (e.keyCode) {
            case KeysType.up: up = false; break;
            case KeysType.down: down = false; break;
            case KeysType.left: left = false; break;
            case KeysType.right: right = false; break;
        }
        this.setState({ up, down, left, right });
    }

    private timeout: NodeJS.Timeout | null = null;
    componentDidUpdate() {
        if (this.timeout) {
            return;
        }
        this.timeout = setTimeout(
            () => {
                this.timeout = null;
                requestAnimationFrame(this.move);
            },
            5
        );
    }

    private move = () => {
        const { up, down, left, right, direction } = this.state;

        if (left) {
            direction.rotateNormalized(this.MAX_ROTATION_SPEED);
        }
        else
        if (right) {
            direction.rotateNormalized(-this.MAX_ROTATION_SPEED);
        }

        if (up) {
            this.velocity.add(direction.clone().multScalar(this.ACCELERATION));
        }
        else
        if (down) {
            this.velocity.add(direction.clone().multScalar(-this.ACCELERATION));
        }

        if (up || down || left || right || this.velocity.length > 0) {
            this.velocity.sub(this.velocity.clone().normalize().multScalar(this.FRICTION));
            this.setState({
                position: this.state.position.clone().add(this.velocity),
                direction
            });
        }
    }

    public render() {
        return (
            <Quad
                center={this.state.position}
                direction={this.state.direction}
                {...this.props}
            />
        );
    }
}
