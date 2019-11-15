import React from "react";
import { Rect as KRect } from "react-konva";
import { Vector2 } from "models";

interface IProps {
    width: number;
    height: number;
    position: Vector2;
    color: string;
    onClick?: (mousePosition: Vector2) => void;
    onMouseMove?: (mousePosition: Vector2) => void;
}

export function Rect(props: IProps) {

    const { color, position, onMouseMove, onClick, ...rest } = props;

    return (
        <KRect
            {...rest}
            stroke={color}
            fill={color}
            x={position.x}
            y={position.y}
            onClick={onClick ? e => onClick(new Vector2(e.evt.clientX, e.evt.clientY)) : undefined}
            onMouseMove={onMouseMove ? e => onMouseMove(new Vector2(e.evt.clientX, e.evt.clientY)) : undefined}
        />
    );
}
