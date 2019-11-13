import React from "react";
import { Background } from "components";
import { ContainerStore } from "stores";

interface IProps {
    containerStore: ContainerStore;
}

export class WelcomeScene extends React.PureComponent<IProps> {

    render() {
        return <Background color="black" containerStore={this.props.containerStore} />;
    }
}
