import { IActiveComponent } from "models/ActiveComponent";

class ActiveStore {

    public activeElement: IActiveComponent | null = null;

    setActive(activeElement: IActiveComponent | null) {
        this.activeElement = activeElement;
    }
}

export const activeStore = new ActiveStore();
