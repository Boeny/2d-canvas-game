import { observable, action } from "mobx";
import { IActiveComponent } from "models/ActiveComponent";

class ActiveStore {

    @observable
    public activeElement: IActiveComponent | null = null;

    @action
    setActive(activeElement: IActiveComponent | null) {
        console.log(activeElement);
        this.activeElement = activeElement;
    }
}

export const activeStore = new ActiveStore();
