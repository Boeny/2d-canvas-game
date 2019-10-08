import { PlayerStore, EnemiesStore, BulletStore, FoodStore } from "stores";
import { ICollider, IBullet } from "interfaces";
import { Vector2 } from "./Vector2";

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
            this.width,
            this.height,
            this.applyInfiniteMovement,
            this.bulletStore.createBullet
        );

        this.foodStore = new FoodStore(width, height, this.applyInfiniteMovement);
    }

    public setSize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    private applyInfiniteMovement = (position: Vector2, radius: number): Vector2 => {

        if (position.x < radius) {
            position.x += this.width;
        }
        else if (position.x > this.width - radius) {
            position.x -= this.width;
        }

        if (position.y < radius) {
            position.y += this.height;
        }
        else if (position.y > this.height - radius) {
            position.y -= this.height;
        }
        return position;
    }

    private getPlayers = (): PlayerStore[] => {
        return this.enemiesStore.data.concat(this.playerStore);
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
            this.foodStore.setPosition();
        }
        return food;
    }
}
