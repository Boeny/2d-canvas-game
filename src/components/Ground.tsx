import React from "react";
import { Rect as KRect } from "react-konva";

interface IProps {
    width: number;
    height: number;
}

export function Ground(props: IProps) {
    return (
        <KRect
            x={0}
            y={0}
            {...props}
        />
    );
}
