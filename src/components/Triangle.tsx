import React from "react";
import { Line as KLine } from "react-konva";
import { Vector2 } from "helpers";

interface IProps {
    a: Vector2;
    b: Vector2;
    c: Vector2;
    color: string;
}

export class Triangle extends React.PureComponent<IProps> {

    public render() {

        const { a, b, c, color } = this.props;

        return (
            <>
                <KLine
                    points={[
                        a.x, window.innerHeight - a.y,
                        b.x, window.innerHeight - b.y,
                        c.x, window.innerHeight - c.y
                    ]}
                    closed={true}
                    stroke={color}
                    fill={color}
                    shadowBlur={1}
                />
            </>
        );
    }
}
