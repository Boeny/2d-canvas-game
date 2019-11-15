import "./Menu.scss";
import React from "react";
import { menuStore } from "stores";
import { observer } from "mobx-react";

function MenuComponent(props: IProps) {
    return (
        <div className="menu editorMenu">
            <button>Stars layer (place stars)</button>
            <button>Star system layer (place planets)</button>
            <button>Planet layer (place satellites)</button>
        </div>
    );
}

interface IProps {
    placeStar: () => void;
    placePlanet: () => void;
    placeSatellite: () => void;
}

@observer
export class EditorMenu extends React.PureComponent<IProps> {

    render() {

        if (menuStore.visible) {
            return null;
        }
        return (
            <MenuComponent {...this.props} />
        );
    }
}
