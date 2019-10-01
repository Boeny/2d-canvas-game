import React from "react";
import { Rect as KRect } from "react-konva";
import { observer } from "mobx-react";
import { containerStore } from "stores/ContainerStore";

interface IProps {
    onClick?: () => void;
}

@observer
export class Ground extends React.PureComponent<IProps> {

    render() {
        return (
            <KRect
                x={0}
                y={0}
                width={containerStore.width}
                height={containerStore.height}
                fill="grey"
            />
        );
    }
}
