import { activeObject, Vector2 } from "models";
import { IActiveComponent } from "interfaces";
import { GameObjectComponent } from "./GameObjectComponent";
import { MouseType } from "enums/MouseType";

export class ActiveComponent<P> extends GameObjectComponent<P> implements IActiveComponent {

    public onKeyDown(e: KeyboardEvent) {}
    public onKeyUp(e: KeyboardEvent) {}
    public onMouseDown(position: Vector2, button: MouseType) {}
    public onMouseMove(position: Vector2) {}

    componentDidMount() {
        super.componentDidMount();
        activeObject.setInstance(this);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        activeObject.setInstance(null);
    }
}
