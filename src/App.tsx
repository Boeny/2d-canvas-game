import React from "react";
import { Stage, Layer } from "react-konva";
import Konva from "konva";
import { observer } from "mobx-react";
import { ContainerStore } from "stores/ContainerStore";
import { BulletStore } from "stores/BulletStore";
import { activeObject, gameLoop, Vector2 } from "models";
import { Ground, Player, Bullets } from "components";

@observer
export class App extends React.PureComponent {

    private stage: Konva.Stage | null = null;
    private containerStore = new ContainerStore();

    private applyInfiniteMovement = (position: Vector2): Vector2 => {

        const { width, height } = this.containerStore;

        if (position.x < 0) {
            position.x += width;
        }
        else
            if (position.x > width) {
                position.x -= width;
            }

        if (position.y < 0) {
            position.y += height;
        }
        else
            if (position.y > height) {
                position.y -= height;
            }
        return position;
    }

    private bulletStore = new BulletStore(this.applyInfiniteMovement);

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
        document.onresize = this.reSize;

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
                    <Ground
                        width={width}
                        height={height}
                    />
                    {
                        width > 0 ?
                            <Player
                                position={new Vector2(width / 2, height / 2)}
                                applyInfiniteMovement={this.applyInfiniteMovement}
                                createBullet={this.bulletStore.createBullet}
                            />
                            : null
                    }
                    <Bullets
                        store={this.bulletStore}
                        applyInfiniteMovement={this.applyInfiniteMovement}
                    />
                </Layer>
            </Stage>
        );
    }
}
