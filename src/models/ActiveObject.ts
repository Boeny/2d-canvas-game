import { IActiveComponent } from "components/ActiveComponent";

class ActiveObject {

    public instance: IActiveComponent | null = null;

    setInstance(instance: IActiveComponent | null) {
        this.instance = instance;
    }
}

export const activeObject = new ActiveObject();
