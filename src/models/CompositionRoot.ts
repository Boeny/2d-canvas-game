import { PlayerStore, EnemiesStore, BulletStore, FoodStore, EditorStore, ContainerStore } from "stores";
import { ICollider, IBullet, INeuralNet, INeuralNetConfig } from "interfaces";
import { VectorHelpers } from "helpers";
import { Vector2 } from "./Vector2";
import { NeuralNet } from "./NeuralNet";

export class CompositionRoot {

    public containerStore = new ContainerStore();
    public bulletStore = new BulletStore();
    public playerStore = new PlayerStore(
        new Vector2(),
        Math.PI / 2,
        this.bulletStore.createBullet
    );
    // public enemiesStore: EnemiesStore;
    // public foodStore = new FoodStore();
    public editorStore = new EditorStore();

    public init() {

        const{ width, height } = this.containerStore;

        this.containerStore.setSize(width, height);
        this.playerStore.setPositionAndDirection(new Vector2(width / 2, height / 2), Math.PI / 2);

        // this.enemiesStore = new EnemiesStore(
        //     this.getMaxDistanceToTheFood(),
        //     this.getRandomPosition,
        //     () => this.foodStore.position,
        //     this.bulletStore.createBullet,
        //     this.createNeuralNet
        // );

        // this.foodStore = new FoodStore(this.getRandomPosition());
    }

    // private getMaxDistanceToTheFood(): number {
    //     return new Vector2(this.width / 2, this.height / 2).length;
    // }

    // private getRandomPosition = (): Vector2 => {
    //     return VectorHelpers.random(this.width, this.height);
    // }

    // private createNeuralNet = (config: INeuralNetConfig): INeuralNet => {
    //     return new NeuralNet(config);
    // }

    // public onCollideFood = (collider: ICollider): number => {
    //     const food = this.foodStore.inArea(collider.position, collider.radius) ? this.foodStore.ENERGY : 0;
    //     if (food > 0) {
    //         this.foodStore.setPosition(this.getRandomPosition());
    //     }
    //     return food;
    // }
}
