import React from "react";
import { Rect as KRect } from "react-konva";
import { ActiveComponent } from "models/ActiveComponent";
import { KeysType } from "enums/KeysType";
import { Vector2 } from "helpers";
import { isNullOrUndefined } from "util";

interface IProps {
    x: number;
    y: number;
}

interface IState {
    position: Vector2;
    moveDirection: Vector2;
}

export class Rect extends ActiveComponent<IProps, IState> {

    ACCELERATION = 0.01;
    DECELERATION = 1;

    private velocity = new Vector2();
    private direction = new Vector2();

    constructor(props: IProps) {
        super(props);
        this.state = { position: new Vector2(props.x, props.y) };
        this.setActive();
    }

    startMoving(moveDirection: Vector2) {
        this.setState({ moveDirection });
    }

    public onKeyDown = (e: KeyboardEvent) => {

        switch (e.keyCode) {
            case KeysType.up: this.startMoving(Vector2.up); break;
            case KeysType.down: this.startMoving(Vector2.down); break;
            case KeysType.left: this.startMoving(Vector2.left); break;
            case KeysType.right: this.startMoving(Vector2.right); break;
        }
        this.velocity.selfAdd(additionalVelocity.multScalar(this.ACCELERATION));
    }

    move = () => {
        this.setState({
            position: this.state.position.add(this.velocity)
        });
    }

    componentDidUpdate() {
        if (this.velocity.sqrLength > 0) {
            this.velocity = this.velocity.sub(this.velocity.normalize().multScalar(this.DECELERATION));
            requestAnimationFrame(this.move);
        }
    }

    public render() {

        return (
            <KRect
                {...this.state.position}
                fill="green"
                width={50}
                height={50}
                shadowBlur={1}
            />
        );
    }
}
