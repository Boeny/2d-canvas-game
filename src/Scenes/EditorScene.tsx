import React from "react";
import { observer } from "mobx-react";
import { EditorStore } from "stores";
import { Circle, GUI, Background, EditorMenu } from "components";

interface IProps {
    store: EditorStore;
}

@observer
export class EditorScene extends React.PureComponent<IProps> {

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
                <Background color="black" />
                {store.planets.map((p, i) => <Circle key={i} {...p} color="white" />)}
            </>
        );
    }
}
