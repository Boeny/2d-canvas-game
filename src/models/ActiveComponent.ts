import React from "react";
import { activeStore } from "stores/ActiveStore";

export interface IActiveComponent {
    onKeyDown: (e: KeyboardEvent) => void;
    onKeyUp: (e: KeyboardEvent) => void;
    onKeyPress: (e: KeyboardEvent) => void;
    onContainerClick: (e: MouseEvent) => void;
}

export class ActiveComponent<P, S> extends React.PureComponent<P, S> implements IActiveComponent {

    public onKeyDown = (e: KeyboardEvent) => {};
    public onKeyUp = (e: KeyboardEvent) => {};
    public onKeyPress = (e: KeyboardEvent) => {};
    public onContainerClick = (e: MouseEvent) => {};

    setActive = () => {
        activeStore.setActive(this);
    }
}
