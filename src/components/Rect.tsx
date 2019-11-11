import React from "react";
import { Rect as KRect } from "react-konva";
import { Vector2 } from "models";

interface IProps {
    width: number;
    height: number;
    position: Vector2;
    color: string;
    onClick?: () => void;
    onMouseMove?: (mousePosition: Vector2) => void;
}

export function Rect(props: IProps) {
    return (
        <KRect
            {...props}
            stroke={props.color}
            fill={props.color}
            x={props.position.x}
            y={props.position.y}
            onMouseMove={props.onMouseMove ? e => props.onMouseMove!(new Vector2(e.evt.clientX, e.evt.clientY)) : undefined}
        />
    );
}
