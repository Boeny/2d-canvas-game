import React from "react";
import { Enemy, IProps } from "./Enemy";
import { Helpers } from "helpers";

export class Enemies extends React.PureComponent<IProps> {

    render() {
        return (
            <>
                {Helpers.range(1).map(() => <Enemy {...this.props} />)}
            </>
        );
    }
}
