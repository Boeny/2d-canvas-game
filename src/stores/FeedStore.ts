import { observable, action } from "mobx";
import { Vector2 } from "models";
import { VectorHelpers } from "helpers/VectorHelpers";

export class FoodStore {

    public radius = 10;
    public ENERGY = 20;

    @observable
    public position = new Vector2();

    constructor(private width: number, private height: number, private applyInfiniteMovement: (position: Vector2, radius: number) => Vector2) {
        this.setPosition();
    }

    @action
    public setPosition() {
        this.position = this.applyInfiniteMovement(this.getPosition(), this.radius);
    }

    public inArea(position: Vector2, radius: number): boolean {
        return this.position.distance(position) < this.radius + radius;
    }
}
