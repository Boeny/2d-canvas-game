import React from "react";
import { observer } from "mobx-react";
import { IKeyEvents, PlayerStore } from "stores/PlayerStore";
import { KeysType } from "enums/KeysType";
import { Vector2 } from "models";
import { ActiveComponent } from "components/ActiveComponent";
import { ScaledTriangle } from "./ScaledTriangle";

interface IComponentProps {
    scale: number;
    position: Vector2;
    direction: Vector2;
    onUpdate: (deltaTimeSec: number, events: IKeyEvents) => void;
}

@observer
export class PlayerComponent extends ActiveComponent<IComponentProps> {

    private events: IKeyEvents = {
        up: false,
        down: false,
        left: false,
        right: false,
        createBullet: false
    };

    public onKeyDown = (e: KeyboardEvent) => {
        switch (e.keyCode) {
            case KeysType.up: this.events.up = true; this.events.down = false; break;
            case KeysType.down: this.events.down = true; this.events.up = false; break;
            case KeysType.left: this.events.left = true; this.events.right = false; break;
            case KeysType.right: this.events.right = true; this.events.left = false; break;
            case KeysType.space: this.events.createBullet = true; break;
        }
    }

    public onKeyUp = (e: KeyboardEvent) => {
        switch (e.keyCode) {
            case KeysType.up: this.events.up = false; break;
            case KeysType.down: this.events.down = false; break;
            case KeysType.left: this.events.left = false; break;
            case KeysType.right: this.events.right = false; break;
            case KeysType.space: this.events.createBullet = false; break;
        }
    }

    public onGameLoop = (deltaTimeSec: number) => {
        this.props.onUpdate(deltaTimeSec, this.events);
    }

    public render() {
        return (
            <ScaledTriangle
                scale={this.props.scale}
                color="green"
                position={this.props.position}
                direction={this.props.direction}
            />
        );
    }
}

interface IProps {
    position: Vector2;
    applyInfiniteMovement: (position: Vector2) => Vector2;
    createBullet: (position: Vector2, direction: Vector2, velocity: Vector2) => void;
}

@observer
export class Player extends React.PureComponent<IProps> {

    store = new PlayerStore(this.props.position, this.props.applyInfiniteMovement, this.props.createBullet);

    render() {
        console.log("render");
        return (
            <PlayerComponent
                scale={this.store.SCALE}
                position={this.store.position}
                direction={this.store.direction}
                onUpdate={this.store.onUpdate}
            />
        );
    }
}
