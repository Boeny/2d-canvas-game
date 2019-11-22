import React from "react";
import { observer } from "mobx-react";
import { containerStore } from "stores";
import { Rect as KRect } from "react-konva";
import { Vector2 } from "models";

interface IProps {
    width: number;
    height: number;
    position: Vector2;
    color: string;
    borderColor?: string;
    borderWidth?: number;
    onClick?: (mousePosition: Vector2) => void;
    onMouseMove?: (mousePosition: Vector2) => void;
}

@observer
export class Rect extends React.PureComponent<IProps> {

    render() {

        const { color, position, onMouseMove, onClick, borderWidth, borderColor, width, height } = this.props;

        return (
            <KRect
                width={width}
                height={height}
                stroke={borderColor || color}
                strokeWidth={borderWidth || 1}
                fill={color}
                x={position.x}
                y={containerStore.height - position.y}
                onClick={onClick ? e => onClick(new Vector2(e.evt.clientX, containerStore.height - e.evt.clientY)) : undefined}
                onMouseMove={onMouseMove ? e => onMouseMove(new Vector2(e.evt.clientX, containerStore.height - e.evt.clientY)) : undefined}
            />
        );
    }
}
