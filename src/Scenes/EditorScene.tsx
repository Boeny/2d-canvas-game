import React from "react";
import { observer } from "mobx-react";
import { EditorStore } from "stores";
import { Vector2, Planet } from "models";
import { Circle, GUI, Background, EditorMenu } from "components";
import { ActiveComponent } from "components/ActiveComponent";
import { Helpers } from "helpers";
import { MouseType } from "enums/MouseType";

interface IProps {
    store: EditorStore;
}

@observer
export class EditorScene extends ActiveComponent<IProps> {

    planet: Planet | null = null;

    onMouseDown(position: Vector2, button: MouseType) {

        if (button !== MouseType.left) {
            return;
        }
        if (this.planet === null) {
            this.planet = this.props.store.createPlanet(position);
        }
        else {
            this.planet = null;
        }
        console.log(this.planet || 'no planet');
    }

    onMouseMove = Helpers.throttle(200, (position: Vector2) => {
        const { store } = this.props;

        if (this.planet === null) {
            return;
        }
        console.log(position, 'radius', position.sub(this.planet.position).length)
        this.planet.radius = position.distance(this.planet.position);
        store.replacePlanet(this.planet);
    });

    render() {

        const { store } = this.props;
        console.log(store.planets)
        return (
            <>
                <GUI>
                    <EditorMenu
                        placeStar={() => {}}
                        placePlanet={() => {}}
                        placeSatellite={() => {}}
                    />
                </GUI>
                <Background color="black" />
                {store.planets.map(p =>
                    <Circle key={p.id} position={p.position} radius={p.radius} color="white" />
                )}
            </>
        );
    }
}
