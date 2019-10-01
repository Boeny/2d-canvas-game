import React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { Vector2 } from "helpers";
import { MovableObject } from "./MovableObject";

interface IBullet {
    position: Vector2;
    velocity: Vector2;
    direction: Vector2;
}

class BulletStore {

    private SPEED = 7;

    @observable
    public bullets: IBullet[] = [];

    @action
    public createBullet(position: Vector2, direction: Vector2, initialVelocity: Vector2) {
        this.bullets.push({
            position: position.clone(),
            velocity: initialVelocity.clone().add(direction.clone().multScalar(this.SPEED)),
            direction: direction.clone()
        });
    }

    @action
    public move(bullet: IBullet, areaWidth: number, areaHeight: number) {
        bullet.position = bullet.position.clone().add(bullet.velocity);

        if (!this.isInArea(bullet.position, areaWidth, areaHeight)) {
            this.bullets.splice(this.bullets.indexOf(bullet), 1);
        }
    }

    private isInArea(position: Vector2, areaWidth: number, areaHeight: number): boolean {
        return position.x > 0 && position.x < areaWidth && position.y > 0 && position.y < areaHeight;
    }
}

export const bulletStore = new BulletStore();

interface IBulletProps extends IProps {
    bullet: IBullet;
}

@observer
class Bullet extends React.PureComponent<IBulletProps> {

    componentDidMount() {
        bulletStore.move(this.props.bullet, this.props.areaWidth, this.props.areaHeight);
    }

    private timeout: NodeJS.Timeout | null = null;
    componentDidUpdate() {
        if (this.timeout) {
            return;
        }
        this.timeout = setTimeout(
            () => {
                this.timeout = null;
                requestAnimationFrame(() => bulletStore.move(this.props.bullet, this.props.areaWidth, this.props.areaHeight));
            },
            5
        );
    }

    render() {

        const { bullet } = this.props;

        return (
            <MovableObject
                position={bullet.position}
                direction={bullet.direction}
                color="red"
                scale={5}
                {...this.props}
            />
        );
    }
}

interface IProps {
    areaWidth: number;
    areaHeight: number;
}

@observer
export class Bullets extends React.PureComponent<IProps> {

    render() {
        return (
            <>
                {bulletStore.bullets.map((bullet, i) =>
                    <Bullet
                        key={i}
                        bullet={bullet}
                        {...this.props}
                    />
                )}
            </>
        );
    }
}
