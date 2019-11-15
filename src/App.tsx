import React from "react";
import { Stage, Layer } from "react-konva";
import { observer } from "mobx-react";
import { menuStore } from "./stores";
import { CompositionRoot, activeObject, gameLoop } from "./models";
import { KeysType } from "./enums";
import { Content } from "Content";

@observer
export class App extends React.PureComponent {

    private container: HTMLDivElement | null = null;
    private root = new CompositionRoot();

    componentDidMount() {
        if (!this.container) {
            return;
        }
        this.focusContainer();

        this.container.addEventListener("click", e => {
            e.preventDefault();
            activeObject.instance && activeObject.instance.onContainerClick(e);
        });
        this.container.addEventListener("mousemove", e => {
            e.preventDefault();
            activeObject.instance && activeObject.instance.onMouseMove(e);
        });
        this.container.addEventListener("keydown", e => {
            e.preventDefault();
            activeObject.instance && activeObject.instance.onKeyDown(e);

            if (e.keyCode === KeysType.esc) {
                this.onEscapePressed();
            }
        });
        this.container.addEventListener("keyup", e => {
            e.preventDefault();
            activeObject.instance && activeObject.instance.onKeyUp(e);
        });
        window.addEventListener("resize", this.reSize);

        this.reSize();
        gameLoop.run();
    }

    private focusContainer = () => {
        this.container && this.container.focus();
    }

    private reSize = () => {
        this.root.containerStore.setSize(window.innerWidth, window.innerHeight);
    }

    private onEscapePressed() {
        menuStore.setVisibility(!menuStore.visible);
    }

    render() {
        // Stage is a div container
        // Layer is actual canvas element (so you may have several canvases in the stage)
        // And then we have canvas shapes inside the Layer
        const { width, height } = this.root.containerStore;

        return (
            <Stage
                width={width}
                height={height}
                ref={el => this.container = el ? el.getStage().container() : null}
                tabIndex={1}
            >
                <Layer>
                    {width > 0
                        ? <Content root={this.root} />
                        : null
                    }
                </Layer>
            </Stage>
        );
    }
}
