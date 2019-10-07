import React from "react";
import { observer } from "mobx-react";
import { IBullet, BulletStore } from "stores/BulletStore";
import { GameObjectComponent } from "components/GameObjectComponent";
import { ScaledTriangle } from "./ScaledTriangle";
import { PlayerStore } from "stores/PlayerStore";

interface IBulletProps {
    scale: number;
    bullet: IBullet;
    move: (deltaTimeSec: number) => void;
    onCollide: () => PlayerStore | undefined;
    remove: () => void;
}

@observer
class Bullet extends GameObjectComponent<IBulletProps> {

    onGameLoop = (deltaTimeSec: number) => {
        const collider = this.props.onCollide();
        if (collider) {
            collider.updateActions({ takeDamage: this.props.bullet.damage });
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
    onCollide: (bullet: IBullet) => PlayerStore | undefined;
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
                        scale={this.props.store.SCALE}
                        move={delta => this.props.store.move(bullet, delta)}
                        onCollide={() => this.props.onCollide(bullet)}
                        remove={() => this.props.store.remove(bullet.id)}
                    />
                )}
            </>
        );
    }
}
