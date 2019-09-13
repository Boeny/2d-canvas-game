import React from "react";
import { Stage, Layer } from "react-konva";
import Konva from "konva";
import { Ground, Cells } from "components";

export class App extends React.PureComponent {

    stage: Konva.Stage | null = null;

    componentDidMount() {
        if (!this.stage) {
            return;
        }
        const container = this.stage.container();
        container.focus();
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
                    <Cells x={25} y={height / 2} />
                </Layer>
            </Stage>
        );
    }
}
