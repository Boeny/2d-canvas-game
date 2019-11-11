import { PlayerStore, EnemiesStore, BulletStore, FoodStore, EditorStore } from "stores";
import { ICollider, IBullet, INeuralNet, INeuralNetConfig } from "interfaces";
import { VectorHelpers } from "helpers/VectorHelpers";
import { Vector2 } from "./Vector2";
import { NeuralNet } from "./NeuralNet";

export class CompositionRoot {

    public bulletStore: BulletStore;
    public playerStore: PlayerStore;
    // public enemiesStore: EnemiesStore;
    public foodStore: FoodStore;
    public editorStore: EditorStore;

    constructor(private width: number, private height: number) {

        this.editorStore = new EditorStore();
        this.bulletStore = new BulletStore();

        this.playerStore = new PlayerStore(
            new Vector2(width / 2, height / 2),
            Math.PI / 2,
            this.bulletStore.createBullet
        );

        // this.enemiesStore = new EnemiesStore(
        //     this.getMaxDistanceToTheFood(),
        //     this.getRandomPosition,
        //     () => this.foodStore.position,
        //     this.bulletStore.createBullet,
        //     this.createNeuralNet
        // );

        this.foodStore = new FoodStore(this.getRandomPosition());
    }

    private getMaxDistanceToTheFood(): number {
        return new Vector2(this.width / 2, this.height / 2).length;
    }

    private getRandomPosition = (): Vector2 => {
        return VectorHelpers.random(this.width, this.height);
    }

    private createNeuralNet = (config: INeuralNetConfig): INeuralNet => {
        return new NeuralNet(config);
    }

    public setSize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public onCollidePlayer = (bullet: IBullet): PlayerStore | undefined => {
        const player = this.playerStore.inArea(bullet.position, bullet.radius) ? this.playerStore : undefined;
        if (player) {
            player.updateActions({ takeDamage: bullet.damage });
        }
        return player;
    }

    public onCollideFood = (collider: ICollider): number => {
        const food = this.foodStore.inArea(collider.position, collider.radius) ? this.foodStore.ENERGY : 0;
        if (food > 0) {
            this.foodStore.setPosition(this.getRandomPosition());
        }
        return food;
    }
}
