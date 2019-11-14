import "./Menu.scss";
import React from "react";
import { menuStore } from "stores";
import { MenuMode } from "enums/MenuMode";
import { observer } from "mobx-react";

function MenuComponent(props: IProps & { showContinue: boolean }) {
    return (
        <div className="menu main">
            {
                props.showContinue
                    ? <button onClick={props.onContinue}>Continue</button>
                    : null
            }
            <button onClick={props.onNew}>New project</button>
            <button onClick={props.onEdit}>Editor</button>
        </div>
    );
}

interface IProps {
    onNew: () => void;
    onContinue?: () => void;
    onEdit?: () => void;
}

@observer
export class Menu extends React.PureComponent<IProps> {

    render() {

        if (!menuStore.visible) {
            return <noscript />;
        }
        return (
            <MenuComponent
                showContinue={menuStore.mode !== MenuMode.default}
                onContinue={() => {
                    menuStore.setMode(MenuMode.continue);
                    this.props.onContinue && this.props.onContinue();
                }}
                onNew={() => {
                    menuStore.setMode(MenuMode.new);
                    this.props.onNew();
                }}
                onEdit={() => {
                    menuStore.setMode(MenuMode.edit);
                    this.props.onEdit && this.props.onEdit();
                }}
            />
        );
    }
}
