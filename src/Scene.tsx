import React from "react";
import { PlayerStore } from "stores/PlayerStore";
import { EnemiesStore } from "stores/EnemiesStore";
import { BulletStore } from "stores/BulletStore";
import { Vector2 } from "models";
import { Player, Bullets, Ground, Enemies } from "components";
import { ObjectWithHealth } from "components/ObjectWithHealth";

interface IProps {
    width: number;
    height: number;
}

export class Scene extends React.Component<IProps> {

    private bulletStore: BulletStore;
    private playerStore: PlayerStore;
    private enemiesStore: EnemiesStore;

    private applyInfiniteMovement = (position: Vector2): Vector2 => {

        const { width, height } = this.props;

        if (position.x < 0) {
            position.x += width;
        }
        else if (position.x > width) {
            position.x -= width;
        }

        if (position.y < 0) {
            position.y += height;
        }
        else if (position.y > height) {
            position.y -= height;
        }
        return position;
    }

    constructor(props: IProps) {
        super(props);

        this.bulletStore = new BulletStore(this.applyInfiniteMovement);

        this.playerStore = new PlayerStore(
            new Vector2(this.props.width / 2, this.props.height / 2),
            Math.PI / 2,
            this.applyInfiniteMovement,
            (position, direction, velocity) => this.bulletStore.createBullet({
                type: "player",
                position,
                direction,
                velocity,
                hasCollision: bullet => this.enemiesStore.data.find(enemy => enemy.inArea(bullet.position)),
                onCollide: (bullet, enemy) => enemy && enemy.onUpdateActions({ takeDamage: bullet.damage })
            })
        );

        this.enemiesStore = new EnemiesStore(
            this.props.width,
            this.props.height,
            this.applyInfiniteMovement,
            (position, direction, velocity) => this.bulletStore.createBullet({
                type: "enemy",
                position,
                direction,
                velocity,
                hasCollision: bullet => this.playerStore.inArea(bullet.position) ? this.playerStore : undefined,
                onCollide: (bullet, player) => player.onUpdateActions({ takeDamage: bullet.damage })
            })
        );
    }

    render() {

        const { width, height } = this.props;

        return (
            <>
                <Ground
                    width={width}
                    height={height}
                />
                <ObjectWithHealth
                    store={this.playerStore}
                    component={store =>
                        <Player
                            scale={store.SCALE}
                            position={store.position}
                            direction={store.direction}
                            onUpdate={store.onUpdate}
                            onUpdateActions={store.onUpdateActions}
                        />
                    }
                />
                <Enemies store={this.enemiesStore} />
                <Bullets store={this.bulletStore} />
            </>
        );
    }
}
