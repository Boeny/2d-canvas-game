import React from "react";
import ReactDOM from "react-dom";

const root = document.getElementById("gui-root");

interface IProps {
    children: JSX.Element | JSX.Element[];
}

export class GUI extends React.PureComponent<IProps> {

    element: HTMLDivElement | null = null;

    componentDidMount() {
        if (!root) {
            return;
        }
        this.element = document.createElement("div");
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
        ReactDOM.unmountComponentAtNode(this.element); // unmount children content from element
        root.removeChild(this.element);
        this.element = null;
    }

    renderPortal() {
        ReactDOM.render(this.props.children, this.element); // mount children at element
    }

    render() {
        return null;
    }
}
