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
        applyInfiniteMovement: (position: Vector2) => Vector2,
        createBullet: (bullet: IBaseBullet) => void,
        createNeuralNet: (config: INeuralNetConfig) => INeuralNet,
        private getFoodPosition: () => Vector2
    ) {
        super(position, angle, applyInfiniteMovement, createBullet);
        this.oldDistanceToTheFood = this.position.distance(this.getFoodPosition());
        this.neuralNet = createNeuralNet({
            inputAxonCount: 4,
            outputAxonCount: 4,
            hiddenLayerAxonCount: [3, 3],
            instantReaction: true
        });
    }

    /**
     * returns number between [0, 1]
     * @param value number between [min, max]
     * @param min -> 0
     * @param max -> 1
     */
    private normalizeNeuralInput(value: number, min: number, max: number): number {
        return (value - min) / (max - min);
    }

    private getNeuralInput(distanceToTheFood: number, foodVectorAngle: number): number[] {
        return [
            // distance to the food, [far, near]
            this.normalizeNeuralInput(this.maxDistanceToTheFood - distanceToTheFood, 0, this.maxDistanceToTheFood),
            // angle between direction and foodVector [PI, 0]
            this.normalizeNeuralInput(Math.PI - Math.abs(this.direction.angle() - foodVectorAngle), 0, Math.PI),
            // if health was increased [not increased, increased]
            this.normalizeNeuralInput(this.health > this.oldHealth ? 1 : 0, 0, 1),
            // if distance to the food was descreased [not decreased, decreased]
            this.normalizeNeuralInput(distanceToTheFood > this.oldDistanceToTheFood ? 1 : 0, 0, 1)
        ];
    }

    private mappingNeuralOutputValue(v: number): boolean {
        return v < 0.5;
    }

    private mappingNeuralOutput(outputValues: number[]): IActions {
        return {
            ...this.actions,
            up: this.mappingNeuralOutputValue(outputValues[0]),
            down: this.mappingNeuralOutputValue(outputValues[1]),
            left: this.mappingNeuralOutputValue(outputValues[2]),
            right: this.mappingNeuralOutputValue(outputValues[3])
        };
    }

    private getMinFoodVectorWithLength(): [Vector2, number] {
        const v1 = this.position.clone().sub(this.getFoodPosition());
        const len1 = v1.length;
        const v2 = ; // TODO: find opposite vector
        const len2 = v2.length;
        return len1 < len2 ? [v1, len1] : [v2, len2];
    }

    public onUpdate = (deltaTimeSec: number, food: number) => {
        const [foodVector, distanceToTheFood] = this.getMinFoodVectorWithLength();

        this.neuralNet.run(this.getNeuralInput(distanceToTheFood, foodVector.angle()));
        this.oldHealth = this.health;
        this.oldDistanceToTheFood = distanceToTheFood;

        this.actions = this.mappingNeuralOutput(this.neuralNet.output);
        super.onUpdate(deltaTimeSec, food);
    }
}
