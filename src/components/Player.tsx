import React from "react";
import { IActions } from "stores/PlayerStore";
import { KeysType } from "enums/KeysType";
import { Vector2 } from "models";
import { ActiveComponent } from "components/ActiveComponent";
import { ScaledTriangle } from "./ScaledTriangle";

interface IProps {
    scale: number;
    position: Vector2;
    direction: Vector2;
    onUpdate: (deltaTimeSec: number) => void;
    onUpdateActions: (actions: Partial<IActions>) => void;
}

export class Player extends ActiveComponent<IProps> {

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
