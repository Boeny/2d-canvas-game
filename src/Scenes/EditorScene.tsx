import React from "react";
import { observer } from "mobx-react";
import { EditorStore, ContainerStore } from "stores";
import { Circle, GUI, Background, EditorMenu } from "components";

interface IProps {
    containerStore: ContainerStore;
    editorStore: EditorStore;
}

@observer
export class EditorScene extends React.PureComponent<IProps> {

    render() {
        const { editorStore, containerStore } = this.props;
        return (
            <>
                <GUI>
                    <EditorMenu
                        placeStar={() => {}}
                        placePlanet={() => {}}
                        placeSatellite={() => {}}
                    />
                </GUI>
                <Background color="black" containerStore={containerStore} />
                {editorStore.planets.map((p, i) => <Circle key={i} {...p} color="white" />)}
            </>
        );
    }
}
