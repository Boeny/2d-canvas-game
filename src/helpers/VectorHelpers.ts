import { Vector2 } from "models";
import { Helpers } from "./Helpers";

export abstract class VectorHelpers {

    public static getTriangleFrontPoint(position: Vector2, direction: Vector2, scale: number): Vector2 {
        return position.clone().add(direction.clone().multScalar(scale));
    }

    public static random(width: number, height: number): Vector2 {
        return new Vector2(Helpers.random(0, width), Helpers.random(0, height));
    }
}
