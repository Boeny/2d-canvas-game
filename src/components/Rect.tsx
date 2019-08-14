import React from "react";
import { Rect as KRect } from "react-konva";
import { ActiveComponent } from "models/ActiveComponent";

interface IProps {
    x: number;
    y: number;
}

interface IState {
    x: number;
    y: number;
}

export class Rect extends ActiveComponent<IProps, IState> {

    state: IState = {
        x: this.props.x,
        y: this.props.y
    };

    public onKeyDown = (e: KeyboardEvent) => {
        this.setState({ x: this.state.x + 1 });
    }

    render() {

        return (
            <KRect
                {...this.state}
                fill="green"
                width={50}
                height={50}
                shadowBlur={1}
                onClick={() => this.setActive()}
            />
        );
    }
}
