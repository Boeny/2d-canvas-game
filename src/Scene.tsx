import React from "react";
import { BulletStore } from "stores/BulletStore";
import { Vector2 } from "models";
import { Player, Bullets, Ground, Enemies } from "components";

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

    private bulletStore = new BulletStore(this.applyInfiniteMovement);

    render() {

        const { width, height } = this.props;

        return (
            <>
                <Ground
                    width={width}
                    height={height}
                />
                <Player
                    position={new Vector2(width / 2, height / 2)}
                    applyInfiniteMovement={this.applyInfiniteMovement}
                    createBullet={this.bulletStore.createBullet}
                />
                <Enemies
                    width={width}
                    height={height}
                    applyInfiniteMovement={this.applyInfiniteMovement}
                    createBullet={this.bulletStore.createBullet}
                />
                <Bullets
                    store={this.bulletStore}
                    applyInfiniteMovement={this.applyInfiniteMovement}
                />
            </>
        );
    }
}
