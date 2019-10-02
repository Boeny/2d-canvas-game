import React from "react";
import { gameLoopStore, IGameObjectComponent } from "stores/GameLoopStore";

export class GameObjectComponent<P> extends React.PureComponent<P> implements IGameObjectComponent {

    componentDidMount() {
        gameLoopStore.addGameObject(this);
    }

    public onGameLoop = (delta: number) => {};
}
