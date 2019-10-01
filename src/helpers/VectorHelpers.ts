import { Vector2 } from "./Vector2";

export abstract class VectorHelpers {

    public static getTriangleFrontPoint(position: Vector2, direction: Vector2, scale: number): Vector2 {
        return position.clone().add(direction.clone().multScalar(scale));
    }
}
