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

    SPEED = 5;
    ROTATION_SPEED = 0.1;
    SCALE = 20;
    deviationAngle = 3 * Math.PI / 4;

    private speed = 0;

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

    timeout: NodeJS.Timeout | null = null;
    componentDidUpdate() {
        if (this.timeout) {
            return;
        }
        this.timeout = setTimeout(
            () => {
                this.timeout = null;
                requestAnimationFrame(this.move);
            },
            10
        );
    }

    move = () => {
        const { up, down, left, right, direction } = this.state;
        this.speed = 0;

        if (up) {
            this.speed = this.SPEED;
        }
        else
        if (down) {
            this.speed = -this.SPEED;
        }
        if (left) {
            direction.selfRotateNormalized(this.ROTATION_SPEED);
        }
        else
        if (right) {
            direction.selfRotateNormalized(-this.ROTATION_SPEED);
        }
        if (up || down || left || right) {
            this.setState({
                position: this.state.position.add(direction.multScalar(this.speed)),
                direction
            });
        }
    }

    get leftSide(): Vector2 {
        return this.state.position.add(this.state.direction.rotateNormalized(this.deviationAngle)
            .multScalar(this.SCALE));
    }

    get rightSide(): Vector2 {
        return this.state.position.add(this.state.direction.rotateNormalized(-this.deviationAngle)
            .multScalar(this.SCALE));
    }

    get frontSide(): Vector2 {
        return this.state.position.add(this.state.direction.multScalar(this.SCALE));
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
