import React from "react";
import { Rect } from "./Rect";
import { Vector2 } from "models";

interface IProps {
    width: number;
    height: number;
    color: string;
}

export class Background extends React.PureComponent<IProps> {

    public render() {
        return (
            <Rect
                position={new Vector2()}
                {...this.props}
            />
        );
    }
}
