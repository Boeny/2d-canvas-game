import { observable, action } from "mobx";
import { Planet, Vector2 } from "models";

export class EditorStore {

    @observable public planets: Planet[] = [];
    public drawRadiusForIndex: number | null = null;

    @action
    public addPlanet(position: Vector2, radius: number) {
        this.planets.push(new Planet(position, radius));
    }

    @action
    public setRadius(index: number, radius: number) {
        this.planets[index].radius = radius;
    }
}
