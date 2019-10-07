import React from "react";
import { Vector2 } from "models";
import { Rect } from "components";
import { Line } from "react-konva";

interface IProps {
    positions: Vector2[];
    setIndex: (i: number) => void;
}

export function Bezier({ positions, setIndex }: IProps) {
    return (
        <>
            <Line
                fill="black"
                stroke="black"
                bezier={true}
                points={[
                    positions[0].x, positions[0].y,
                    positions[1].x, positions[1].y,
                    positions[2].x, positions[2].y,
                    positions[3].x, positions[3].y
                ]}
            />
            <Line
                fill="#ff5555"
                stroke="#ff5555"
                strokeWidth={1}
                points={[
                    positions[0].x, positions[0].y,
                    positions[1].x, positions[1].y,
                    positions[2].x, positions[2].y,
                    positions[3].x, positions[3].y
                ]}
            />
            {
                positions.map((p, i) =>
                    <Rect
                        key={i}
                        width={10}
                        height={10}
                        position={p}
                        onClick={() => setIndex(i)}
                        color="red"
                    />
                )
            }
        </>
    );
}
