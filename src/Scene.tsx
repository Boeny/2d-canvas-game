import React from "react";
import { Vector2 } from "models";
import { Player, Bullets, Rect, Enemies, ObjectWithHealth, Food } from "components";
import { CompositionRoot } from "models/CompositionRoot";

interface IProps {
    width: number;
    height: number;
}

export class Scene extends React.PureComponent<IProps> {

    root = new CompositionRoot(this.props.width, this.props.height);

    componentDidUpdate() {
        this.root.setSize(this.props.width, this.props.height);
    }

    render() {

        const { width, height } = this.props;

        return (
            <>
                <Rect
                    position={new Vector2()}
                    width={width}
                    height={height}
                    color="white"
                />
                <ObjectWithHealth
                    store={this.root.playerStore}
                    component={store =>
                        <Player
                            scale={store.radius}
                            position={store.position}
                            direction={store.direction}
                            onUpdate={delta => store.onUpdate(delta, this.root.onCollideFood(store))}
                            onUpdateActions={store.updateActions}
                        />
                    }
                />
                <Enemies store={this.root.enemiesStore} onCollideFood={this.root.onCollideFood} />
                <Bullets store={this.root.bulletStore} onCollide={this.root.onCollidePlayer} />
                <Food store={this.root.foodStore} />
            </>
        );
    }
}
