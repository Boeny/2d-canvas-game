import React from "react";
import { Circle as KCircle } from "react-konva";
import { Vector2 } from "models";

interface IProps {
    position: Vector2;
    radius: number;
    color: string;
}

export class Circle extends React.PureComponent<IProps> {

    public render() {

        const { position, radius, color } = this.props;

        return (
            <KCircle
                x={position.x}
                y={position.y}
                radius={radius}
                stroke={color}
                fill={color}
                shadowBlur={1}
            />
        );
    }
}
