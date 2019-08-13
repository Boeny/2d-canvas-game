import React from "react";
import { Stage, Layer, Rect } from "react-konva";
import Konva from "konva";
import { activeStore } from "stores/ActiveStore";

interface IProps {
    x: number;
    y: number;
}

interface IState {
    color: string;
}

class ColoredRect extends React.PureComponent<IProps, IState> {

    public state: IState = { color: "green" };

    public onKeyDown = () => console.log("circle is moving");
    public onKeyUp = () => console.log("circle stopped moving");
    public onKeyPress = () => console.log("circle has moved");

    private onClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
        e.evt.preventDefault();
        activeStore.setActive(this);
        this.setState({ color: Konva.Util.getRandomColor() });
    }

    render() {

        return (
            <Rect
                {...this.props}
                width={50}
                height={50}
                fill={this.state.color}
                shadowBlur={1}
                onClick={this.onClick}
            />
        );
    }
}

export class App extends React.PureComponent {

    stage: Konva.Stage | null = null;

    componentDidMount() {
        if (!this.stage) {
            return;
        }
        const container = this.stage.container();
        container.focus();

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
        return (
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                ref={el => this.stage = el ? el.getStage() : null}
                tabIndex={1}
            >
                <Layer>
                    <Ground onClick={() => activeStore.setActive(null)} />
                    <ColoredRect x={window.innerWidth / 2} y={window.innerHeight / 2} />
                </Layer>
            </Stage>
        );
    }
}
