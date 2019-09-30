import React from "react";
import { Stage, Layer } from "react-konva";
import Konva from "konva";
import { activeStore } from "stores/ActiveStore";
import { Ground, Player } from "components";

export class App extends React.PureComponent {

    stage: Konva.Stage | null = null;

    componentDidMount() {
        if (!this.stage) {
            return;
        }
        const container = this.stage.container();
        container.focus();

        container.addEventListener("click", e => {
            e.preventDefault();
            activeStore.activeElement && activeStore.activeElement.onContainerClick(e);
        });

        container.addEventListener("keydown", e => {
            e.preventDefault();
            activeStore.activeElement && activeStore.activeElement.onKeyDown(e);
        });
        container.addEventListener("keyup", e => {
            e.preventDefault();
            activeStore.activeElement && activeStore.activeElement.onKeyUp(e);
        });
        container.addEventListener("keypress", e => {
            e.preventDefault();
            activeStore.activeElement && activeStore.activeElement.onKeyPress(e);
        });
    }

    render() {
        // Stage is a div container
        // Layer is actual canvas element (so you may have several canvases in the stage)
        // And then we have canvas shapes inside the Layer
        const width = window.innerWidth;
        const height = window.innerHeight;

        return (
            <Stage
                width={width}
                height={height}
                ref={el => this.stage = el ? el.getStage() : null}
                tabIndex={1}
            >
                <Layer>
                    <Ground
                        x={0}
                        y={0}
                        width={width}
                        height={height}
                    />
                    <Player x={width / 2} y={height / 2} />
                </Layer>
            </Stage>
        );
    }
}
