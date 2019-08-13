import { observable, action } from "mobx";

interface IActiveElement {
    onKeyDown(e: KeyboardEvent): void;
    onKeyUp(e: KeyboardEvent): void;
    onKeyPress(e: KeyboardEvent): void;
}

class ActiveStore {

    @observable
    public activeElement: IActiveElement | null = null;

    @action
    setActive(activeElement: IActiveElement | null) {
        console.log(activeElement);
        this.activeElement = activeElement;
    }
}

export const activeStore = new ActiveStore();
