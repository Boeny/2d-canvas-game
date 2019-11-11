import React from "react";
import { Stage, Layer } from "react-konva";
import Konva from "konva";
import { observer } from "mobx-react";
import { menuStore, ContainerStore } from "stores";
import { activeObject, gameLoop } from "models";
import { Scene } from "Scene";
import { Menu } from "Menu";
import { KeysType } from "enums/KeysType";

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

            if (e.keyCode === KeysType.esc) {
                this.onEscapePressed(container);
            }
        });
        container.addEventListener("keyup", e => {
            e.preventDefault();
            activeObject.instance && activeObject.instance.onKeyUp(e);
        });
        window.addEventListener("resize", this.reSize);

        this.reSize();
        gameLoop.run();
    }

    private reSize = () => {
        this.containerStore.setSize(window.innerWidth, window.innerHeight);
    }

    private onEscapePressed(container: HTMLDivElement) {
        const visible = !menuStore.visible;
        menuStore.setVisibility(visible);

        if (!visible) {
            container.focus();
        }
    }

    render() {
        // Stage is a div container
        // Layer is actual canvas element (so you may have several canvases in the stage)
        // And then we have canvas shapes inside the Layer
        const { width, height } = this.containerStore;

        return (
            <>
                <Menu />
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
            </>
        );
    }
}
