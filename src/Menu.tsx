import "./Menu.scss";
import React from "react";
import { menuStore } from "stores";
import { MenuMode } from "enums/MenuMode";
import { observer } from "mobx-react";

export function MenuComponent(props: IProps) {
    return (
        <div className="menu">
            <button onClick={props.onContinue}>Continue</button>
            <button onClick={props.onNew}>New project</button>
            <button onClick={props.onEdit}>Editor</button>
        </div>
    );
}

interface IProps {
    onContinue: () => void;
    onNew: () => void;
    onEdit: () => void;
}

@observer
export class Menu extends React.PureComponent<IProps> {

    render() {

        if (!menuStore.visible) {
            return null;
        }
        return (
            <MenuComponent
                onContinue={() => {
                    menuStore.setMode(MenuMode.continue);
                    this.props.onContinue();
                }}
                onNew={() => {
                    menuStore.setMode(MenuMode.new);
                    this.props.onNew();
                }}
                onEdit={() => {
                    menuStore.setMode(MenuMode.edit);
                    this.props.onEdit();
                }}
            />
        );
    }
}
