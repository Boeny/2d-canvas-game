import React from "react";
import { observer } from "mobx-react";
import { EditorStore } from "stores";
import { Circle } from "components/Circle";

interface IProps {
    store: EditorStore;
}

@observer
export class EditorScene extends React.PureComponent<IProps> {

    render() {
        const { store } = this.props;
        return (
            <>
                {/* <GUI>
                    <div>
                        <button>Stars layer (place stars)</button>
                        <button>Star system layer (place planets)</button>
                        <button>Planet layer (place satellites)</button>
                    </div>
                </GUI> */}
                {store.planets.map((p, i) => <Circle key={i} {...p} color="white" />)}
            </>
        );
    }
}
