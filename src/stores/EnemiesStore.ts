import { EnemyStore } from "./EnemyStore";
import { Vector2 } from "models";
import { Helpers } from "helpers";
import { IBaseBullet, INeuralNet, INeuralNetConfig } from "interfaces";

export class EnemiesStore {

    public COUNT = 1;
    public data: EnemyStore[];

    constructor(
        maxDistanceToTheFood: number,
        getRandomPosition: () => Vector2,
        getFoodPosition: () => Vector2,
        createBullet: (bullet: IBaseBullet) => void,
        createNeuralNet: (config: INeuralNetConfig) => INeuralNet
    ) {
        this.data = Helpers.range(this.COUNT).map(() => {
            return new EnemyStore(
                maxDistanceToTheFood,
                getRandomPosition(),
                Helpers.random(0, Math.PI * 2),
                createBullet,
                createNeuralNet,
                getFoodPosition
            );
        });
    }
}
