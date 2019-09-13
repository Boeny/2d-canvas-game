import React from "react";
import { Cell, ICell } from "./Cell";

interface IProps {
    x: number;
    y: number;
}

export class Cells extends React.PureComponent<IProps> {

    public render() {

        return (
            <Cell item={new ICell(this.props.x, this.props.y, 1, { r: 255, g: 255, b: 255 })} />
        );
    }
}
