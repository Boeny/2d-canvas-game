import React from "react";
import { EditorStore } from "stores";
import { Circle } from "components/Circle";
import { observer } from "mobx-react";

interface IProps {
    store: EditorStore;
}

@observer
export class Editor extends React.PureComponent<IProps> {

    render() {
        const { store } = this.props;
        return (
            <>
                {store.planets.map((p, i) => <Circle key={i} {...p} color="white" />)}
            </>
        );
    }
}
