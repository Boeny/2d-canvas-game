import { observable, action } from "mobx";
import { MenuMode } from "enums";

class MenuStore {

    @observable public visible = true;
    @observable public mode: MenuMode = MenuMode.default;

    @action public setMode(mode: MenuMode) {
        this.mode = mode;
        this.visible = false;
    }
    @action public setVisibility(value: boolean) {
        this.visible = value;
    }
}

export const menuStore = new MenuStore();
