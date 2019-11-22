import React from "react";
import { observer } from "mobx-react";
import { containerStore, menuStore } from "stores";
import { Rect } from "./figures";
import { Vector2 } from "models";

interface IProps {
    color: string;
    onClick?: (mousePosition: Vector2) => void;
    onMouseMove?: (mousePosition: Vector2) => void;
}

@observer
export class Background extends React.PureComponent<IProps> {

    public render() {

        const { color, onClick, onMouseMove } = this.props;

        return (
            <Rect
                position={new Vector2(0, containerStore.height)}
                width={containerStore.width}
                height={containerStore.height}
                color={color}
                onClick={menuStore.visible ? undefined : onClick}
                onMouseMove={menuStore.visible ? undefined : onMouseMove}
            />
        );
    }
}
