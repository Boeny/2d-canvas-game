import { observable, action } from "mobx";
import { Planet, Vector2 } from "models";

export class EditorStore {

    @observable public planets: Planet[] = [];

    @action
    public addPlanet(x: number, y: number, radius: number) {
        this.planets.push(new Planet(new Vector2(x, y), radius));
    }

    @action
    public changeRadius(index: number, radius: number) {
        this.planets[index].radius = radius;
    }
}
