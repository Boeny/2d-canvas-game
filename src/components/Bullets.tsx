import React from "react";
import { observer } from "mobx-react";
import { IBullet, BulletStore } from "stores/BulletStore";
import { Vector2 } from "models";
import { GameObjectComponent } from "components/GameObjectComponent";
import { ScaledTriangle } from "./ScaledTriangle";

interface IBulletProps {
    bullet: IBullet;
    onUpdate: (bullet: IBullet, deltaTimeSec: number) => void;
}

@observer
class Bullet extends GameObjectComponent<IBulletProps> {

    onGameLoop = (deltaTimeSec: number) => {
        this.props.onUpdate(this.props.bullet, deltaTimeSec);
    }

    render() {

        const { bullet } = this.props;

        return (
            <ScaledTriangle
                position={bullet.position}
                direction={bullet.direction}
                color="#005500"
                scale={5}
            />
        );
    }
}

interface IProps {
    store: BulletStore;
    applyInfiniteMovement: (position: Vector2) => Vector2;
}

@observer
export class Bullets extends React.PureComponent<IProps> {

    render() {
        return (
            <>
                {this.props.store.bullets.map((bullet, i) =>
                    <Bullet
                        key={i}
                        bullet={bullet}
                        onUpdate={this.props.store.onUpdate}
                    />
                )}
            </>
        );
    }
}
