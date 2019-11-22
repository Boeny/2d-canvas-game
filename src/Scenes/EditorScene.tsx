import React from "react";
import { observer } from "mobx-react";
import { EditorStore } from "stores";
import { ICircleProps } from "interfaces";
import { Vector2, Planet } from "models";
import { Circle, GUI, Background, EditorMenu } from "components";

const PlanetComponent = observer((p: ICircleProps) => <Circle {...p} />);

interface IProps {
    store: EditorStore;
}

@observer
export class EditorScene extends React.PureComponent<IProps> {

    planet: Planet | null = null;

    toggleDrawing = (position: Vector2) => {
        if (this.planet === null) {
            this.planet = new Planet(position, 0);
            this.props.store.addPlanet(this.planet);
        }
        else {
            this.planet = null;
        }
        console.log(this.planet);
    }

    setRadius = (position: Vector2) => {
        const { store } = this.props;

        if (this.planet === null) {
            return;
        }
        store.setRadius(this.planet, position.sub(this.planet.position).length);
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
                    <PlanetComponent key={i} {...p} color="white" />
                )}
            </>
        );
    }
}
