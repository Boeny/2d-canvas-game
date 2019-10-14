import { PlayerStore, EnemiesStore, BulletStore, FoodStore } from "stores";
import { ICollider, IBullet, INeuralNet, INeuralNetConfig } from "interfaces";
import { VectorHelpers } from "helpers/VectorHelpers";
import { Vector2 } from "./Vector2";
import { Line2 } from "./Line2";
import { NeuralNet } from "./NeuralNet";

interface IBorders {
    horizontal: Line2[];
    vertical: Line2[];
}

export class CompositionRoot {

    public bulletStore: BulletStore;
    public playerStore: PlayerStore;
    public enemiesStore: EnemiesStore;
    public foodStore: FoodStore;
    public borders: IBorders;

    constructor(private width: number, private height: number) {

        this.borders = {
            horizontal: [
                new Line2(0, 0, this.width, 0),
                new Line2(0, this.height, this.width, this.height)
            ],
            vertical: [
                new Line2(0, 0, 0, this.height),
                new Line2(this.width, 0, this.width, this.height)
            ]
        };

        this.bulletStore = new BulletStore(this.applyInfiniteMovement);

        this.playerStore = new PlayerStore(
            new Vector2(width / 2, height / 2),
            Math.PI / 2,
            this.applyInfiniteMovement,
            this.bulletStore.createBullet
        );

        this.enemiesStore = new EnemiesStore(
            this.getMaxDistanceToTheFood(),
            this.getRandomPosition,
            () => this.foodStore.position,
            this.applyInfiniteMovement,
            this.bulletStore.createBullet,
            this.createNeuralNet,
            this.getIntersectionVector
        );

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

    private pointInScreenRange(p: Vector2): boolean {
        return p.x >= 0 && p.x <= this.width && p.y >= 0 && p.y <= this.height;
    }

    private getIntersectionVector = (v: Vector2): Vector2 => {
        const line = Line2.fromVector(v);
        const { horizontal, vertical } = this.borders;

        const hor1 = horizontal[0].intersection(line);
        const hor2 = horizontal[1].intersection(line);

        if (hor1 && hor2 && this.pointInScreenRange(hor1) && this.pointInScreenRange(hor2)) {
            return hor1.sub(hor2);
        }

        const vert1 = vertical[0].intersection(line);
        const vert2 = vertical[1].intersection(line);

        if (vert1 && vert2 && this.pointInScreenRange(vert1) && this.pointInScreenRange(vert2)) {
            return vert1.sub(vert2);
        }

        return (vert1 && this.pointInScreenRange(vert1) ? vert1 : vert2!).sub(hor1 && this.pointInScreenRange(hor1) ? hor1 : hor2!);
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
