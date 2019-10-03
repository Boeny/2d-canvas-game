import React from "react";
import { observer } from "mobx-react";
import { PlayerStore, IActions } from "stores/PlayerStore";
import { KeysType } from "enums/KeysType";
import { Vector2 } from "models";
import { ActiveComponent } from "components/ActiveComponent";
import { ScaledTriangle } from "./ScaledTriangle";

interface IComponentProps {
    scale: number;
    position: Vector2;
    direction: Vector2;
    onUpdate: (deltaTimeSec: number) => void;
    onUpdateActions: (actions: Partial<IActions>) => void;
}

export class PlayerComponent extends ActiveComponent<IComponentProps> {

    public onKeyDown = (e: KeyboardEvent) => {
        switch (e.keyCode) {
            case KeysType.up: this.props.onUpdateActions({ up: true, down: false }); break;
            case KeysType.down: this.props.onUpdateActions({ down: true, up: false }); break;
            case KeysType.left: this.props.onUpdateActions({ left: true, right: false }); break;
            case KeysType.right: this.props.onUpdateActions({ right: true, left: false }); break;
            case KeysType.space: this.props.onUpdateActions({ createBullet: true }); break;
        }
    }

    public onKeyUp = (e: KeyboardEvent) => {
        switch (e.keyCode) {
            case KeysType.up: this.props.onUpdateActions({ up: false }); break;
            case KeysType.down: this.props.onUpdateActions({ down: false }); break;
            case KeysType.left: this.props.onUpdateActions({ left: false }); break;
            case KeysType.right: this.props.onUpdateActions({ right: false }); break;
            case KeysType.space: this.props.onUpdateActions({ createBullet: false }); break;
        }
    }

    public onGameLoop = (deltaTimeSec: number) => {
        this.props.onUpdate(deltaTimeSec);
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

    store = new PlayerStore(this.props.position, Math.PI / 2, this.props.applyInfiniteMovement, this.props.createBullet);

    render() {
        return (
            <PlayerComponent
                scale={this.store.SCALE}
                position={this.store.position}
                direction={this.store.direction}
                onUpdate={this.store.onUpdate}
                onUpdateActions={this.store.onUpdateActions}
            />
        );
    }
}
