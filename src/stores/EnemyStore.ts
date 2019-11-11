import { PlayerStore, IActions } from "./PlayerStore";
import { Vector2 } from "models";
import { IBaseBullet, INeuralNet, INeuralNetConfig } from "interfaces";

export class EnemyStore extends PlayerStore {

    private oldHealth = this.MAX_HEALTH;
    private oldDistanceToTheFood: number;
    private neuralNet: INeuralNet;

    constructor(
        private maxDistanceToTheFood: number,
        position: Vector2,
        angle: number,
        createBullet: (bullet: IBaseBullet) => void,
        createNeuralNet: (config: INeuralNetConfig) => INeuralNet,
        private getFoodPosition: () => Vector2
    ) {
        super(position, angle, createBullet);

        this.oldDistanceToTheFood = maxDistanceToTheFood;
        this.neuralNet = createNeuralNet({
            inputAxonCount: 4,
            outputAxonCount: 4,
            hiddenLayerAxonCount: [3, 3],
            instantReaction: true
        });
    }

    private getMinFoodVectorAngleAndLength(position: Vector2, foodPosition: Vector2): [number, number] {
        const vectorToTheFood = position.clone().sub(foodPosition);
        const distanceToTheFood = vectorToTheFood.length;
        const foodVectorAngle = vectorToTheFood.angle();

        return [foodVectorAngle, distanceToTheFood];
    }

    /**
     * returns number between [0, 1]
     * @param value number between [min, max]
     * @param min -> 0
     * @param max -> 1
     */
    private normalizeNeuralInput(value: number, min: number = 0, max: number = 1): number {
        return (value - min) / (max - min);
    }

    private getNeuralInput(
        distanceToTheFood: number,
        maxDistanceToTheFood: number,
        angle: number,
        foodVectorAngle: number,
        healthIncreased: boolean,
        distanceDecreased: boolean
    ): number[] {
        return [
            // distance to the food, [far, near]
            this.normalizeNeuralInput(maxDistanceToTheFood - distanceToTheFood, 0, maxDistanceToTheFood),
            // angle between direction and foodVector [PI, 0]
            this.normalizeNeuralInput(Math.abs(Math.cos(angle - foodVectorAngle))),
            // if health was increased [not increased, increased]
            this.normalizeNeuralInput(healthIncreased ? 1 : 0),
            // if distance to the food was descreased [not decreased, decreased]
            this.normalizeNeuralInput(distanceDecreased ? 1 : 0)
        ];
    }

    private mappingNeuralOutputValue(v: number): boolean {
        return v < 0.5;
    }

    private mappingNeuralOutput(actions: IActions, outputValues: number[]): IActions {
        return {
            ...actions,
            up: this.mappingNeuralOutputValue(outputValues[0]),
            down: this.mappingNeuralOutputValue(outputValues[1]),
            left: this.mappingNeuralOutputValue(outputValues[2]),
            right: this.mappingNeuralOutputValue(outputValues[3])
        };
    }

    public onUpdate(deltaTimeSec: number) {
        const [foodVectorAngle, distanceToTheFood] = this.getMinFoodVectorAngleAndLength(this.position, this.getFoodPosition());

        this.neuralNet.run(this.getNeuralInput(
            distanceToTheFood,
            this.maxDistanceToTheFood,
            this.direction.angle(),
            foodVectorAngle,
            this.health > this.oldHealth,
            distanceToTheFood > this.oldDistanceToTheFood
        ));
        this.oldHealth = this.health;
        this.oldDistanceToTheFood = distanceToTheFood;

        this.actions = this.mappingNeuralOutput(this.actions, this.neuralNet.output);
        super.onUpdate(deltaTimeSec);
    }
}
