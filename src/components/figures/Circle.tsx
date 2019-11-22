import React from "react";
import { observer } from "mobx-react";
import { containerStore } from "stores";
import { Circle as KCircle } from "react-konva";
import { ICircleProps } from "interfaces";

@observer
export class Circle extends React.PureComponent<ICircleProps> {

    public render() {

        const { position, radius, color, borderColor } = this.props;

        return (
            <KCircle
                x={position.x}
                y={containerStore.height - position.y}
                radius={radius}
                stroke={borderColor || color}
                strokeWidth={1}
                fill={color}
                shadowBlur={1}
            />
        );
    }
}
