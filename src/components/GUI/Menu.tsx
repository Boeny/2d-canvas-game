import "./Menu.scss";
import React from "react";
import { menuStore } from "stores";
import { Mode, KeysType } from "enums";
import { observer } from "mobx-react";

interface IComponentProps {
    mode: Mode;
    showContinue: boolean;
    onNew: () => void;
    onContinue: () => void;
    onEdit: () => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

class MenuComponent extends React.PureComponent<IComponentProps> {

    activeButton: HTMLButtonElement | null = null;

    componentDidMount() {
        this.activeButton && this.activeButton.focus();
    }

    setActiveButton = (condition: boolean) => (el: HTMLButtonElement | null) => {
        if (condition) {
            this.activeButton = el;
        }
    }

    render() {

        const { mode, showContinue, onNew, onContinue, onEdit, onKeyDown } = this.props;

        return (
            <div className="menu main" onKeyDown={onKeyDown}>
                {
                    showContinue
                        ? (
                            <button
                                onClick={onContinue}
                                ref={this.setActiveButton(mode === Mode.continue || mode === Mode.new)}
                            >
                                Continue
                            </button>
                        )
                        : null
                }
                <button onClick={onNew}>New project</button>
                <button onClick={onEdit} ref={this.setActiveButton(mode === Mode.edit)}>Editor</button>
            </div>
        );
    }
}

interface IProps {
    focusContainer: () => void;
    onNew: () => void;
}

@observer
export class Menu extends React.PureComponent<IProps> {

    close = (condition: boolean) => {
        if (condition) {
            menuStore.setVisibility(false);
            this.props.focusContainer();
        }
    }

    setMode = (mode: Mode) => {
        menuStore.setMode(mode);
        this.close(true);

        if (mode === Mode.new) {
            this.props.onNew();
        }
    }

    render() {

        const { mode, visible } = menuStore;

        if (!visible) {
            return null;
        }
        return (
            <MenuComponent
                mode={mode}
                onKeyDown={e => this.close(e.keyCode === KeysType.esc && mode !== Mode.default)}
                showContinue={mode === Mode.new || mode === Mode.continue}
                onContinue={() => this.setMode(Mode.continue)}
                onNew={() => this.setMode(Mode.new)}
                onEdit={() => this.setMode(Mode.edit)}
            />
        );
    }
}
