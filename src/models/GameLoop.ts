import { runInAction } from "mobx";
import { IGameObjectComponent } from "interfaces";
import { menuStore } from "stores";

class GameLoop {

    private gameObjects: IGameObjectComponent[] = [];
    private prevTime = 0;

    constructor(private isOnMenuMode: () => boolean) {}

    public run = (time = 100) => {
        requestAnimationFrame(this.run);

        const deltaTimeSec = Math.min(100, time - this.prevTime) / 1000;
        this.prevTime = time;

        if (this.isOnMenuMode()) {
            return;
        }

        runInAction(() => this.gameObjects.forEach(o => o.onGameLoop(deltaTimeSec)));
    }

    public addGameObject(gameObject: IGameObjectComponent) {
        this.gameObjects.push(gameObject);
    }

    public removeGameObject(gameObject: IGameObjectComponent) {
        this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1);
    }
}

export const gameLoop = new GameLoop(() => menuStore.visible);
