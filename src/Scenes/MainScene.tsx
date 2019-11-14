import React from "react";
import { Player, Bullets, ObjectWithHealth, Background } from "components";
import { CompositionRoot } from "models";
import { IBullet } from "interfaces";

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
        const { root } = this.props;
        return (
            <>
                <Background color="black" containerStore={root.containerStore} />
                <ObjectWithHealth
                    store={root.playerStore}
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
                <Bullets store={root.bulletStore} checkPlayerCollision={this.checkPlayerCollision} />
                {/*<Food store={this.root.foodStore} />*/}
            </>
        );
    }
}
