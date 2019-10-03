import { observable, action } from "mobx";

export class ContainerStore {

    @observable public width = 0;
    @observable public height = 0;

    @action
    public setSize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}
