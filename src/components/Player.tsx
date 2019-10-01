import React from "react";
import { Line } from "react-konva";
import { ActiveComponent } from "models/ActiveComponent";
import { KeysType } from "enums/KeysType";
import { Vector2 } from "helpers";

interface IProps {
    x: number;
    y: number;
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
    private SCALE = 20;
    private WING_DEVIATION_ANGLE = 3 * Math.PI / 4;
    private FRICTION = 0.02;

    private velocity = new Vector2();

    constructor(props: IProps) {
        super(props);
        this.state = {
            position: new Vector2(props.x, props.y),
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

    private get leftSide(): Vector2 {
        return this.state.position.clone().add(
            this.state.direction.clone().rotateNormalized(this.WING_DEVIATION_ANGLE).multScalar(this.SCALE)
        );
    }

    private get rightSide(): Vector2 {
        return this.state.position.clone().add(
            this.state.direction.clone().rotateNormalized(-this.WING_DEVIATION_ANGLE).multScalar(this.SCALE)
        );
    }

    private get frontSide(): Vector2 {
        return this.state.position.clone().add(this.state.direction.clone().multScalar(this.SCALE));
    }

    public render() {

        const left = this.leftSide;
        const right = this.rightSide;
        const front = this.frontSide;

        return (
            <Line
                points={[
                    left.x, window.innerHeight - left.y,
                    right.x, window.innerHeight - right.y,
                    front.x, window.innerHeight - front.y
                ]}
                closed={true}
                stroke="green"
                fill="green"
                shadowBlur={1}
            />
        );
    }
}
