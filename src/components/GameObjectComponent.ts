import React from "react";
import { gameLoop } from "models";

export interface IGameObjectComponent {
    onGameLoop: (delta: number) => void;
}

export class GameObjectComponent<P> extends React.Component<P> implements IGameObjectComponent {

    public onGameLoop = (delta: number) => {};

    componentDidMount() {
        gameLoop.addGameObject(this);
    }

    componentWillUnmount() {
        gameLoop.removeGameObject(this);
    }
}
