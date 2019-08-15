import React from "react";
import { Rect as KRect } from "react-konva";

interface IProps {
    x: number;
    y: number;
    width: number;
    height: number;
    onClick?: () => void;
}

export class Ground extends React.PureComponent<IProps> {

    render() {

        return (
            <KRect
                {...this.props}
                fill="grey"
            />
        );
    }
}
