import React from "react";
import { observer } from "mobx-react";
import { ICollider } from "interfaces";
import { Circle } from "./figures";

interface IProps {
    store: ICollider;
}

@observer
export class Food extends React.PureComponent<IProps> {

    render() {
        return (
            <Circle
                position={this.props.store.position}
                radius={this.props.store.radius}
                color="#0000ff"
            />
        );
    }
}
