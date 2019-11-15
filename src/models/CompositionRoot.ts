import { PlayerStore, BulletStore, EditorStore } from "stores";
import { Vector2 } from "./Vector2";

export class CompositionRoot {

    public bulletStore = new BulletStore();
    public playerStore = new PlayerStore(
        new Vector2(),
        Math.PI / 2,
        this.bulletStore.createBullet
    );
    // public enemiesStore: EnemiesStore;
    // public foodStore = new FoodStore();
    public editorStore = new EditorStore();

    public init(width: number, height: number) {

        this.playerStore.setPositionAndDirection(new Vector2(width / 2, height / 2), Math.PI / 2);
        this.playerStore.velocity = new Vector2();

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
