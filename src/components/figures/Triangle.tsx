import React from "react";
import { observer } from "mobx-react";
import { containerStore } from "stores";
import { Line as KLine } from "react-konva";
import { Vector2 } from "models";

interface IProps {
    a: Vector2;
    b: Vector2;
    c: Vector2;
    color: string;
}

@observer
export class Triangle extends React.PureComponent<IProps> {

    public render() {

        const { a, b, c, color } = this.props;

        return (
            <KLine
                points={[
                    a.x, containerStore.height - a.y,
                    b.x, containerStore.height - b.y,
                    c.x, containerStore.height - c.y
                ]}
                closed={true}
                stroke={color}
                fill={color}
                shadowBlur={1}
            />
        );
    }
}
