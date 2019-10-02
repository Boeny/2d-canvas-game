import { runInAction } from "mobx";

export interface IGameObjectComponent {
    onGameLoop: (delta: number) => void;
}

class GameLoopStore {

    gameObjects: IGameObjectComponent[] = [];

    prevTime = 0;

    run = (time = 100) => {
        const deltaTimeSec = Math.min(100, time - this.prevTime) / 1000;
        this.prevTime = time;
        runInAction(() => this.gameObjects.forEach(o => o.onGameLoop(deltaTimeSec)));
        requestAnimationFrame(this.run);
    }

    addGameObject(gameObject: IGameObjectComponent) {
        this.gameObjects.push(gameObject);
    }
}

export const gameLoopStore = new GameLoopStore();
