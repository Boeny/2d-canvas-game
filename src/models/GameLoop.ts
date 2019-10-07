import { runInAction } from "mobx";

export interface IGameObjectComponent {
    onGameLoop: (delta: number) => void;
}

class GameLoop {

    gameObjects: IGameObjectComponent[] = [];

    prevTime = 0;

    run = (time = 100) => {
        requestAnimationFrame(this.run);

        const deltaTimeSec = Math.min(100, time - this.prevTime) / 1000;
        this.prevTime = time;

        runInAction(() => this.gameObjects.forEach(o => o.onGameLoop(deltaTimeSec)));
    }

    addGameObject(gameObject: IGameObjectComponent) {
        this.gameObjects.push(gameObject);
    }

    removeGameObject(gameObject: IGameObjectComponent) {
        this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1);
    }
}

export const gameLoop = new GameLoop();
