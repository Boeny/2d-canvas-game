import "./global.scss";
import React, { useState } from "react";
import { Canvas, CanvasContext } from "react-three-fiber";
import { Player } from "components";
import { Vector3 } from "three-export";

export function App() {
    const [context, setContext] = useState<CanvasContext | null>(null);
    // useEffect(
    //     () => {
    //         container && container.addEventListener("keydown", e => {
    //             e.preventDefault();
    //             activeStore.activeElement && activeStore.activeElement.onKeyDown(e);
    //         });
    //     },
    //     []
    // );
    console.log(context);
    return (
        <Canvas
            invalidateFrameloop
            onCreated={setContext}
            style={{ background: "#000000", width: "100%", height: "100%" }}
            camera={{ position: new Vector3(0, 0, 1800) }}
        >
            <ambientLight intensity={0.5} />
            <spotLight intensity={0.5} position={[300, 300, 4000]} />
            {
                context
                    ? <Player x={context.canvas.clientWidth / 2} y={context.canvas.clientHeight / 2} />
                    : null
            }
        </Canvas>
    );
}
