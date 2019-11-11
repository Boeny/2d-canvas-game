import "./Menu.scss";
import React from "react";
import { menuStore } from "stores";
import { MenuMode } from "enums/MenuMode";
import { observer } from "mobx-react";

interface IComponentProps {
    onContinue: () => void;
    onNew: () => void;
    onEdit: () => void;
}

export function MenuComponent(props: IComponentProps) {
    return (
        <div className="menu">
            <button onClick={props.onContinue}>Continue</button>
            <button onClick={props.onNew}>New project</button>
            <button onClick={props.onEdit}>Editor</button>
        </div>
    );
}

@observer
export class Menu extends React.Component {

    render() {

        if (!menuStore.visible) {
            return null;
        }
        return (
            <MenuComponent
                onContinue={() => menuStore.setMode(MenuMode.continue)}
                onNew={() => menuStore.setMode(MenuMode.new)}
                onEdit={() => menuStore.setMode(MenuMode.edit)}
            />
        );
    }
}
