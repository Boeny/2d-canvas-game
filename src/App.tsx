import React from "react";
import { Stage, Layer } from "react-konva";
import Konva from "konva";
import { observer } from "mobx-react";
import { activeStore } from "stores/ActiveStore";
import { bulletStore } from "stores/BulletStore";
import { containerStore } from "stores/ContainerStore";
import { gameLoopStore } from "stores/GameLoopStore";
import { Vector2 } from "helpers";
import { Ground, Player, Bullets } from "components";

@observer
export class App extends React.PureComponent {

    stage: Konva.Stage | null = null;

    reSize = () => {
        containerStore.setSize(window.innerWidth, window.innerHeight);
    }

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
        document.onresize = this.reSize;

        this.reSize();
        gameLoopStore.run();
    }

    render() {
        // Stage is a div container
        // Layer is actual canvas element (so you may have several canvases in the stage)
        // And then we have canvas shapes inside the Layer
        return (
            <Stage
                width={containerStore.width}
                height={containerStore.height}
                ref={el => this.stage = el ? el.getStage() : null}
                tabIndex={1}
            >
                <Layer>
                    <Ground />
                    {
                        containerStore.width > 0 ?
                            <Player
                                position={new Vector2(containerStore.width / 2, containerStore.height / 2)}
                                createBullet={(...args) => bulletStore.createBullet(...args)}
                            />
                            : null
                    }
                    <Bullets />
                </Layer>
            </Stage>
        );
    }
}
