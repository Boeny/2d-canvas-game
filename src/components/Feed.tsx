import React from "react";
import { observer } from "mobx-react";
import { FeedStore } from "stores/FeedStore";
import { Circle } from "./Circle";
import { PlayerStore } from "stores/PlayerStore";
import { GameObjectComponent } from "./GameObjectComponent";

interface IProps {
    store: FeedStore;
    onCollide: (store: FeedStore) => PlayerStore | undefined;
}

@observer
export class Feed extends GameObjectComponent<IProps> {

    onGameLoop = () => {
        const collider = this.props.onCollide(this.props.store);
        if (collider) {
            collider.updateActions({ feed: this.props.store.ENERGY });
            this.props.store.setPosition();
        }
    }

    render() {
        return (
            <Circle
                position={this.props.store.position}
                radius={this.props.store.radius}
                color="#0000ff"
            />
        );
    }
}
