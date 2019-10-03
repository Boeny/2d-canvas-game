import React from "react";
import { observer } from "mobx-react";
import { Vector2 } from "models";
import { HealthBar } from "./HealthBar";

interface IStoreWithHealth {
    health: number;
    MAX_HEALTH: number;
    position: Vector2;
}

interface IProps<T> {
    store: T;
    component: (store: T) => JSX.Element;
}

@observer
export class ObjectWithHealth<T extends IStoreWithHealth> extends React.PureComponent<IProps<T>> {

    DISTANCE = 30;

    render() {

        const { store, component } = this.props;
        if (store.health === 0) {
            return null;
        }
        return (
            <>
                {component(store)}
                <HealthBar
                    health={store.health}
                    maxHealth={store.MAX_HEALTH}
                    position={store.position.clone().add(Vector2.up.multScalar(this.DISTANCE))}
                />
            </>
        );
    }
}
