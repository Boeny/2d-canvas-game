import { PlayerStore, EnemiesStore, BulletStore, FoodStore } from "stores";
import { ICollider, IBullet } from "interfaces";
import { Vector2 } from "./Vector2";
import { VectorHelpers } from "helpers/VectorHelpers";

export class CompositionRoot {

    public bulletStore: BulletStore;
    public playerStore: PlayerStore;
    public enemiesStore: EnemiesStore;
    public foodStore: FoodStore;

    constructor(private width: number, private height: number) {

        this.bulletStore = new BulletStore(this.applyInfiniteMovement);

        this.playerStore = new PlayerStore(
            new Vector2(width / 2, height / 2),
            Math.PI / 2,
            this.applyInfiniteMovement,
            this.bulletStore.createBullet
        );

        this.enemiesStore = new EnemiesStore(
            this.getRandomPosition,
            this.applyInfiniteMovement,
            this.bulletStore.createBullet
        );

        this.foodStore = new FoodStore(this.getRandomPosition());
    }

    public setSize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public applyInfiniteMovement = (_position: Vector2): Vector2 => {
        const position = _position.clone();

        if (position.x < 0) {
            position.x += this.width;
        }
        else if (position.x > this.width) {
            position.x -= this.width;
        }

        if (position.y < 0) {
            position.y += this.height;
        }
        else if (position.y > this.height) {
            position.y -= this.height;
        }
        return position;
    }

    private getRandomPosition = (): Vector2 => {
        return VectorHelpers.random(this.width, this.height);
    }

    private getPlayers = (): PlayerStore[] => {
        return this.enemiesStore.data.concat(this.playerStore);
    }

    public onCollidePlayer = (bullet: IBullet): PlayerStore | undefined => {
        console.log(this.playerStore.inArea(bullet.position, bullet.radius));
        const player = this.playerStore.inArea(bullet.position, bullet.radius) ? this.playerStore : undefined;
        if (player) {
            player.updateActions({ takeDamage: bullet.damage });
        }
        return player;
    }

    public onCollideFood = (collider: ICollider): number => {
        console.log(this.foodStore.inArea(collider.position, collider.radius));
        const food = this.foodStore.inArea(collider.position, collider.radius) ? this.foodStore.ENERGY : 0;
        if (food > 0) {
            this.foodStore.setPosition(this.getRandomPosition());
        }
        return food;
    }
}
