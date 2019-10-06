import React from "react";
import { gameLoop, IGameObjectComponent } from "models";

export class GameObjectComponent<P> extends React.Component<P> implements IGameObjectComponent {

    componentDidMount() {
        gameLoop.addGameObject(this);
    }

    public onGameLoop = (delta: number) => {};
}
