import "./Menu.scss";
import React from "react";
import { menuStore } from "stores";
import { observer } from "mobx-react";

interface IProps {
    placeStar: () => void;
    placePlanet: () => void;
    placeSatellite: () => void;
}

export function EditorMenu(props: IProps) {
    return (
        <div className="menu editorMenu">
            <button>Stars layer (place stars)</button>
            <button>Star system layer (place planets)</button>
            <button>Planet layer (place satellites)</button>
        </div>
    );
}
