import { Vector2 } from "models";
import { MouseType } from "enums/MouseType";

export interface IActiveComponent {
    onKeyDown(e: KeyboardEvent): void;
    onKeyUp(e: KeyboardEvent): void;
    onMouseDown(position: Vector2, button: MouseType): void;
    onMouseMove(position: Vector2): void;
}
