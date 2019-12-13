import { observable, action } from "mobx";
import { Planet, Vector2 } from "models";

export class EditorStore {

    id = 0;
    @observable public planets: Planet[] = [];

    @action
    private addPlanetAction(planet: Planet) {
        this.planets = this.planets.concat(planet);
    }

    public createPlanet(position: Vector2) {
        this.id += 1;
        const planet = new Planet(this.id, position, 0);
        this.addPlanetAction(planet);
        return planet;
    }

    @action
    public replacePlanetAction(planet: Planet) {
        this.planets = this.planets.map(p => p.id === planet.id ? planet : p);
    }
}
