import React from "react";
import { observer } from "mobx-react";
import { BulletStore } from "stores/BulletStore";
import { IBullet } from "interfaces";
import { GameObjectComponent } from "components/GameObjectComponent";
import { ScaledTriangle } from "./ScaledTriangle";

interface IBulletProps {
    scale: number;
    bullet: IBullet;
    move: (deltaTimeSec: number) => void;
    checkPlayerCollision: () => boolean;
    remove: () => void;
}

@observer
class Bullet extends GameObjectComponent<IBulletProps> {

    onGameLoop = (deltaTimeSec: number) => {
        const hasCollision = this.props.checkPlayerCollision();
        if (hasCollision) {
            this.props.remove();
        }
        else {
            this.props.move(deltaTimeSec);
        }
    }

    render() {

        const { bullet, scale } = this.props;

        return (
            <ScaledTriangle
                position={bullet.position}
                direction={bullet.direction}
                color={bullet.type === "player" ? "#005500" : "#550000"}
                scale={scale}
            />
        );
    }
}

interface IProps {
    store: BulletStore;
    checkPlayerCollision: (bullet: IBullet) => boolean;
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
                        scale={bullet.radius}
                        move={delta => this.props.store.move(bullet, delta)}
                        checkPlayerCollision={() => this.props.checkPlayerCollision(bullet)}
                        remove={() => this.props.store.remove(bullet.id)}
                    />
                )}
            </>
        );
    }
}
