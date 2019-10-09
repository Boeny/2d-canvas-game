import { observable, action } from "mobx";
import { Vector2 } from "models";

export class FoodStore {

    public radius = 10;
    public ENERGY = 20;

    @observable
    public position = new Vector2();

    constructor(position: Vector2) {
        this.setPosition(position);
    }

    @action
    public setPosition(position: Vector2) {
        this.position = position;
    }

    public inArea(position: Vector2, radius: number): boolean {
        return this.position.distance(position) < this.radius + radius;
    }
}
