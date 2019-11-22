import { activeObject } from "models";
import { IActiveComponent } from "interfaces";
import { GameObjectComponent } from "./GameObjectComponent";

export class ActiveComponent<P> extends GameObjectComponent<P> implements IActiveComponent {

    public onKeyDown = (e: KeyboardEvent) => {};
    public onKeyUp = (e: KeyboardEvent) => {};

    componentDidMount() {
        super.componentDidMount();
        activeObject.setInstance(this);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        activeObject.setInstance(null);
    }
}
