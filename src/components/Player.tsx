import React from "react";
import { Vector3, BufferGeometry, BufferAttribute } from "three-export";
import { MeshPhongMaterial } from "three";

interface IProps {
    x: number;
    y: number;
}

export function Player(props: IProps) {
    const { x, y } = props;
    console.log(x, y);
    return (
        <mesh
            visible
            geometry={triangleGeometry(x, y)}
            position={new Vector3(x, y, 10)}
            rotation={[0, 0, 0]}
            material={new MeshPhongMaterial({ color: "#272727" })}
        />
    );
}

function triangleGeometry(x: number, y: number) {
    const geometry = new BufferGeometry();
    const vertices = new Float32Array([
        x - 10, y + 10, 0,
        x + 10, y + 10, 0,
        x, y - 10, 0
    ]);
    geometry.addAttribute("position", new BufferAttribute(vertices, 3));
    return geometry;
}
