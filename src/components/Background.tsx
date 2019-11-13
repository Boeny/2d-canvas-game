import React from "react";
import { Rect } from "./Rect";
import { Vector2 } from "models";
import { observer } from "mobx-react";
import { ContainerStore } from "stores";

interface IProps {
    containerStore: ContainerStore;
    color: string;
}

@observer
export class Background extends React.PureComponent<IProps> {

    public render() {

        const { containerStore, color } = this.props;

        return (
            <Rect
                position={new Vector2()}
                width={containerStore.width}
                height={containerStore.height}
                color={color}
            />
        );
    }
}
