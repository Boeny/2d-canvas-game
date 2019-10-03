import React from "react";
import { PlayerStore } from "stores/PlayerStore";
import { EnemiesStore } from "stores/EnemiesStore";
import { BulletStore, IBullet } from "stores/BulletStore";
import { Vector2 } from "models";
import { Player, Bullets, Ground, Enemies } from "components";
import { ObjectWithHealth } from "components/ObjectWithHealth";

interface IProps {
    width: number;
    height: number;
}

export class Scene extends React.Component<IProps> {

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

    private hasCollisionWith = (bullet: IBullet): boolean => {

        let hasCollision = false;

        if (bullet.type === "enemy") {
            hasCollision = this.playerStore.inArea(bullet.position);
            if (hasCollision) {
                this.playerStore.takeDamage(bullet.damage);
            }
        }
        else {
            hasCollision = this.enemiesStore.data.some(enemy => {
                const damage = enemy.inArea(bullet.position);
                if (damage) {
                    enemy.takeDamage(bullet.damage);
                }
                return damage;
            });
        }
        return hasCollision;
    }

    private bulletStore = new BulletStore(this.applyInfiniteMovement, this.hasCollisionWith);

    private playerStore = new PlayerStore(
        new Vector2(this.props.width / 2, this.props.height / 2),
        Math.PI / 2,
        this.applyInfiniteMovement,
        (...args) => this.bulletStore.createBullet("player", ...args)
    );

    private enemiesStore = new EnemiesStore(
        this.props.width,
        this.props.height,
        this.applyInfiniteMovement,
        (...args) => this.bulletStore.createBullet("enemy", ...args)
    );

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
