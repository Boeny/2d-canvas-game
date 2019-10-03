import React from "react";
import { Enemy } from "./Enemy";
import { EnemiesStore } from "stores/EnemiesStore";
import { ObjectWithHealth } from "components/ObjectWithHealth";

interface IProps {
    store: EnemiesStore;
}

export class Enemies extends React.PureComponent<IProps> {

    render() {
        return (
            <>
                {this.props.store.data.map(store =>
                    <ObjectWithHealth
                        store={store}
                        component={store =>
                            <Enemy
                                scale={store.SCALE}
                                position={store.position}
                                direction={store.direction}
                                onUpdate={store.onUpdate}
                            />
                        }
                    />
                )}
            </>
        );
    }
}
