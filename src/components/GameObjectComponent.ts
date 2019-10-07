import React from "react";
import { gameLoop, IGameObjectComponent } from "models";

export class GameObjectComponent<P> extends React.Component<P> implements IGameObjectComponent {

    public onGameLoop = (delta: number) => {};

    componentDidMount() {
        gameLoop.addGameObject(this);
    }

    componentWillUnmount() {
        gameLoop.removeGameObject(this);
    }
}
