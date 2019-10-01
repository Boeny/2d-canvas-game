import { Vector2 } from "../helpers/Vector2";
import { observable, action } from "mobx";

class ContainerStore {

    @observable
    public width = 0;

    @observable
    public height = 0;

    get halfWidth(): number {
        return this.width / 2;
    }
    get halfHeight(): number {
        return this.height / 2;
    }

    @action
    public setSize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public applyInfiniteMovement(position: Vector2): Vector2 {

        if (position.x < 0) {
            position.x += this.width;
        }
        else
            if (position.x > this.width) {
                position.x -= this.width;
            }

        if (position.y < 0) {
            position.y += this.height;
        }
        else
            if (position.y > this.height) {
                position.y -= this.height;
            }
        return position;
    }

    public hasPointInside(position: Vector2): boolean {
        return position.x > 0 && position.x < this.width
            && position.y > 0 && position.y < this.height;
    }

    public hasShapeInside(point: Vector2, radius: number): boolean {
        return point.x > -radius && point.x < this.width + radius
            && point.y > -radius && point.y < this.height + radius;
    }
}

export const containerStore = new ContainerStore();
