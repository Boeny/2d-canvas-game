import React from "react";
import { Stage, Layer } from "react-konva";
import Konva from "konva";
import { observer } from "mobx-react";
import { ContainerStore } from "stores/ContainerStore";
import { activeObject, gameLoop } from "models";
import { Scene } from "Scene";

@observer
export class App extends React.PureComponent {

    private stage: Konva.Stage | null = null;
    private containerStore = new ContainerStore();

    componentDidMount() {
        if (!this.stage) {
            return;
        }
        const container = this.stage.container();
        container.focus();

        container.addEventListener("click", e => {
            e.preventDefault();
            activeObject.instance && activeObject.instance.onContainerClick(e);
        });
        container.addEventListener("keydown", e => {
            e.preventDefault();
            activeObject.instance && activeObject.instance.onKeyDown(e);
        });
        container.addEventListener("keyup", e => {
            e.preventDefault();
            activeObject.instance && activeObject.instance.onKeyUp(e);
        });
        container.addEventListener("keypress", e => {
            e.preventDefault();
            activeObject.instance && activeObject.instance.onKeyPress(e);
        });
        window.addEventListener("resize", this.reSize);

        this.reSize();
        gameLoop.run();
    }

    private reSize = () => {
        this.containerStore.setSize(window.innerWidth, window.innerHeight);
    }

    render() {
        // Stage is a div container
        // Layer is actual canvas element (so you may have several canvases in the stage)
        // And then we have canvas shapes inside the Layer
        const { width, height } = this.containerStore;

        return (
            <Stage
                width={width}
                height={height}
                ref={el => this.stage = el ? el.getStage() : null}
                tabIndex={1}
            >
                <Layer>
                    {
                        width > 0 ?
                            <Scene
                                width={width}
                                height={height}
                            />
                            : null
                    }
                </Layer>
            </Stage>
        );
    }
}
