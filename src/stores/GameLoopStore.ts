import { runInAction } from "mobx";

export interface IGameObjectComponent {
    onGameLoop: () => void;
}

class GameLoopStore {

    gameObjects: IGameObjectComponent[] = [];

    run = () => {
        runInAction(() => this.gameObjects.forEach(o => o.onGameLoop()));
        requestAnimationFrame(this.run);
    }

    addGameObject(gameObject: IGameObjectComponent) {
        this.gameObjects.push(gameObject);
    }
}

export const gameLoopStore = new GameLoopStore();
