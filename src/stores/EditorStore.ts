import { observable, action } from "mobx";
import { Planet } from "models";

export class EditorStore {

    @observable public planets: Planet[] = [];

    @action
    public addPlanet(planet: Planet) {
        this.planets.push(planet);
    }

    @action
    public setRadius(planet: Planet, radius: number) {
        planet.radius = radius;
    }
}
