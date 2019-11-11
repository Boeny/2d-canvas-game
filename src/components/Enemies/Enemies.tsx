import React from "react";
import { Enemy } from "./Enemy";
import { EnemiesStore } from "stores/EnemiesStore";
import { ObjectWithHealth } from "components/ObjectWithHealth";
import { PlayerStore } from "stores/PlayerStore";

interface IProps {
    store: EnemiesStore;
    onCollideFood: (enemy: PlayerStore) => number;
}

export class Enemies extends React.PureComponent<IProps> {

    render() {
        return (
            <>
                {this.props.store.data.map((store, i) =>
                    <ObjectWithHealth
                        key={i}
                        store={store}
                        component={store =>
                            <Enemy
                                scale={store.radius}
                                position={store.position}
                                direction={store.direction}
                                onUpdate={delta => store.onUpdate(delta)}
                            />
                        }
                    />
                )}
            </>
        );
    }
}
