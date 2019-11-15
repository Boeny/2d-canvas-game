import React from "react";
import { Player, Bullets, ObjectWithHealth, Background } from "components";
import { CompositionRoot } from "models";
import { IBullet } from "interfaces";
import { Mode } from "enums";

interface IProps {
    root: CompositionRoot;
}

export class MainScene extends React.PureComponent<IProps> {

    private checkPlayerCollision = (bullet: IBullet): boolean => {
        const { playerStore } = this.props.root;
        const hasCollision = playerStore.inArea(bullet.position, bullet.radius);

        if (hasCollision) {
            playerStore.updateActions({ takeDamage: bullet.damage });
        }
        return hasCollision;
    }

    render() {

        const { playerStore, bulletStore } = this.props.root;

        return (
            <>
                <Background color="black" />
                <ObjectWithHealth
                    store={playerStore}
                    component={store =>
                        <Player
                            scale={store.radius}
                            position={store.position}
                            direction={store.direction}
                            onUpdate={delta => store.onUpdate(delta)}
                            onUpdateActions={store.updateActions}
                        />
                    }
                />
                {/*<Enemies store={this.root.enemiesStore} onCollideFood={this.root.onCollideFood} />*/}
                <Bullets store={bulletStore} checkPlayerCollision={this.checkPlayerCollision} />
                {/*<Food store={this.root.foodStore} />*/}
            </>
        );
    }
}
