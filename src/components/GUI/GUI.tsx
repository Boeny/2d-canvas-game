import React from "react";
import ReactDOM from "react-dom";
import { menuStore } from "stores";
import { KeysType } from "enums";

const root = document.getElementById("gui-root");

interface IProps {
    children: JSX.Element | JSX.Element[];
}

export class GUI extends React.PureComponent<IProps> {

    private element: HTMLDivElement | null = null;

    componentDidMount() {
        if (!root) {
            return;
        }
        this.element = document.createElement("div");
        this.element.addEventListener("keydown", this.onEscPressed);
        root.appendChild(this.element);
        this.renderPortal();
    }

    componentDidUpdate() {
        this.renderPortal();
    }

    componentWillUnmount() {
        if (!root || !this.element) {
            return;
        }
        this.element.removeEventListener("keydown", this.onEscPressed);
        ReactDOM.unmountComponentAtNode(this.element); // unmount children content from element
        root.removeChild(this.element);
        this.element = null;
    }

    private renderPortal() {
        ReactDOM.render(this.props.children, this.element); // mount children at element
    }

    onEscPressed = (e: KeyboardEvent) => {
        if (e.keyCode === KeysType.esc) {
            menuStore.setVisibility(!menuStore.visible);
        }
    }

    render() {
        return null;
    }
}
