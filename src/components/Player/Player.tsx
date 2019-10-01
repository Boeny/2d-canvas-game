import React from "react";
import { ActiveComponent } from "models/ActiveComponent";
import { KeysType } from "enums/KeysType";
import { Vector2 } from "helpers";
import { Quad } from "./Quad";

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
                position: this.applyInfiniteMovement(this.state.position.clone().add(this.velocity)),
                direction
            });
        }
    }

    applyInfiniteMovement(position: Vector2): Vector2 {
        const { areaWidth, areaHeight } = this.props;

        if (position.x < 0) {
            position.x += areaWidth;
        }
        else
        if (position.x > areaWidth) {
            position.x -= areaWidth;
        }

        if (position.y < 0) {
            position.y += areaHeight;
        }
        else
        if (position.y > areaHeight) {
            position.y -= areaHeight;
        }
        return position;
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
