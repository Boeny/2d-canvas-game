import React from "react";
import { observer } from "mobx-react";
import { EditorStore } from "stores";
import { Circle, GUI, Background, EditorMenu } from "components";
import { Vector2 } from "models";

interface IProps {
    store: EditorStore;
}

@observer
export class EditorScene extends React.PureComponent<IProps> {

    toggleDrawing = (position: Vector2) => {
        const { store } = this.props;

        if (store.drawRadiusForIndex === null) {
            store.addPlanet(position, 0);
            store.drawRadiusForIndex = store.planets.length - 1;

        }
        else {
            store.drawRadiusForIndex = null;
        }
        console.log(store.drawRadiusForIndex, store.planets);
    }

    setRadius = (position: Vector2) => {
        const { store } = this.props;

        if (store.drawRadiusForIndex === null) {
            return;
        }
        const center = store.planets[store.drawRadiusForIndex].position;
        store.setRadius(store.drawRadiusForIndex, position.sub(center).length);
    }

    render() {

        const { store } = this.props;

        return (
            <>
                <GUI>
                    <EditorMenu
                        placeStar={() => {}}
                        placePlanet={() => {}}
                        placeSatellite={() => {}}
                    />
                </GUI>
                <Background
                    color="black"
                    onClick={this.toggleDrawing}
                    onMouseMove={this.setRadius}
                />
                {store.planets.map((p, i) =>
                    <Circle key={i} {...p} color="white" />
                )}
            </>
        );
    }
}
