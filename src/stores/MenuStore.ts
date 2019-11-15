import { observable, action } from "mobx";
import { Mode } from "enums";

class MenuStore {

    @observable public visible = true;
    @observable public mode: Mode = Mode.default;

    @action public setMode(mode: Mode) {
        this.mode = mode;
    }
    @action public setVisibility(value: boolean) {
        this.visible = value;
    }
}

export const menuStore = new MenuStore();
