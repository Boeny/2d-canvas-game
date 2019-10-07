import React from "react";
import { PlayerStore } from "stores/PlayerStore";
import { EnemiesStore } from "stores/EnemiesStore";
import { BulletStore } from "stores/BulletStore";
import { FeedStore } from "stores/FeedStore";
import { Vector2 } from "models";
import { Player, Bullets, Rect, Enemies, ObjectWithHealth, Feed } from "components";

interface ICollider {
    position: Vector2;
    radius: number;
}

interface IProps {
    width: number;
    height: number;
}

export class Scene extends React.PureComponent<IProps> {

    private bulletStore: BulletStore;
    private playerStore: PlayerStore;
    private enemiesStore: EnemiesStore;
    private feedStore: FeedStore;

    private applyInfiniteMovement = (position: Vector2, radius: number): Vector2 => {

        const { width, height } = this.props;

        if (position.x < radius) {
            position.x += width;
        }
        else if (position.x > width - radius) {
            position.x -= width;
        }

        if (position.y < radius) {
            position.y += height;
        }
        else if (position.y > height - radius) {
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
                velocity
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
                velocity
            })
        );

        this.feedStore = new FeedStore(this.props.width, this.props.height, this.applyInfiniteMovement);
    }

    private getPlayers(): PlayerStore[] {
        return this.enemiesStore.data.concat(this.playerStore);
    }

    private onCollidePlayers(collider: ICollider): PlayerStore | undefined {
        return this.getPlayers().find(x => x.inArea(collider.position, collider.radius));
    }

    render() {

        const { width, height } = this.props;

        return (
            <>
                <Rect
                    position={new Vector2()}
                    width={width}
                    height={height}
                    color="white"
                />
                <ObjectWithHealth
                    store={this.playerStore}
                    component={store =>
                        <Player
                            scale={store.SCALE}
                            position={store.position}
                            direction={store.direction}
                            onUpdate={store.onUpdate}
                            onUpdateActions={store.updateActions}
                        />
                    }
                />
                <Enemies store={this.enemiesStore} />
                <Bullets store={this.bulletStore} onCollide={this.onCollidePlayers} />
                <Feed store={this.feedStore} onCollide={this.onCollidePlayers} />
            </>
        );
    }
}
