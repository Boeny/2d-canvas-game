import { activeStore } from "stores/ActiveStore";
import { GameObjectComponent } from "./GameObjectComponent";
import { IGameObjectComponent } from "stores/GameLoopStore";

export interface IActiveComponent {
    onKeyDown: (e: KeyboardEvent) => void;
    onKeyUp: (e: KeyboardEvent) => void;
    onKeyPress: (e: KeyboardEvent) => void;
    onContainerClick: (e: MouseEvent) => void;
}

export class ActiveComponent<P> extends GameObjectComponent<P> implements IActiveComponent, IGameObjectComponent {

    public onKeyDown = (e: KeyboardEvent) => {};
    public onKeyUp = (e: KeyboardEvent) => {};
    public onKeyPress = (e: KeyboardEvent) => {};
    public onContainerClick = (e: MouseEvent) => {};

    componentDidMount() {
        super.componentDidMount();
        activeStore.setActive(this);
    }
}
