import React from "react";
import { observer } from "mobx-react";
import { bulletStore, IBullet } from "stores/BulletStore";
import { MovableObject } from "./MovableObject";
import { GameObjectComponent } from "models/GameObjectComponent";

interface IProps {
    bullet: IBullet;
}

@observer
class Bullet extends GameObjectComponent<IProps> {

    onGameLoop = (deltaTimeSec: number) => {
        bulletStore.move(this.props.bullet, deltaTimeSec);
    }

    render() {

        const { bullet } = this.props;

        return (
            <MovableObject
                position={bullet.position}
                direction={bullet.direction}
                color="#005500"
                scale={5}
            />
        );
    }
}

@observer
export class Bullets extends React.PureComponent {

    render() {
        return (
            <>
                {bulletStore.bullets.map((bullet, i) =>
                    <Bullet
                        key={i}
                        bullet={bullet}
                    />
                )}
            </>
        );
    }
}
