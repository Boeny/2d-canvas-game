import React from "react";
import { Rect } from "./Rect";
import { Vector2 } from "models";
import { observer } from "mobx-react";
import { containerStore } from "stores";

interface IProps {
    color: string;
    onClick?: (mousePosition: Vector2) => void;
    onMouseMove?: (mousePosition: Vector2) => void;
}

@observer
export class Background extends React.PureComponent<IProps> {

    public render() {
        return (
            <Rect
                position={new Vector2()}
                width={containerStore.width}
                height={containerStore.height}
                {...this.props}
            />
        );
    }
}
