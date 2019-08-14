import React from "react";
import { activeStore } from "stores/ActiveStore";

export interface IActiveComponent {
    onKeyDown: (e: KeyboardEvent) => void;
    onKeyUp: (e: KeyboardEvent) => void;
    onKeyPress: (e: KeyboardEvent) => void;
}

export class ActiveComponent<P, S> extends React.PureComponent<P, S> implements IActiveComponent {

    public onKeyDown = (_: KeyboardEvent) => {};
    public onKeyUp = (_: KeyboardEvent) => {};
    public onKeyPress = (_: KeyboardEvent) => {};

    setActive = () => {
        activeStore.setActive(this);
    }
}
