import React from "react";
import { Player, Bullets, Background, Enemies, ObjectWithHealth, Food } from "components";
import { CompositionRoot } from "models/CompositionRoot";
import { MenuMode } from "enums/MenuMode";
import { Editor } from "Editor";
import { menuStore } from "stores";
import { observer } from "mobx-react";

interface IMainProps {
    root: CompositionRoot;
}

class MainScene extends React.PureComponent<IMainProps> {

    render() {
        const { root } = this.props;
        return (
            <>
                <ObjectWithHealth
                    store={root.playerStore}
                    component={store =>
                        <Player
                            scale={store.radius}
                            position={store.position}
                            direction={store.direction}
                            onUpdate={delta => store.onUpdate(delta)}
                            onUpdateActions={store.updateActions}
                        />
                    }
                />
                {/*<Enemies store={this.root.enemiesStore} onCollideFood={this.root.onCollideFood} />*/}
                <Bullets store={root.bulletStore} onCollide={root.onCollidePlayer} />
                {/*<Food store={this.root.foodStore} />*/}
            </>
        );
    }
}

interface IComponentProps extends IProps {
    mode: MenuMode;
}

class SceneComponent extends React.PureComponent<IComponentProps> {

    root = new CompositionRoot(this.props.width, this.props.height);

    componentDidUpdate() {
        this.root.setSize(this.props.width, this.props.height);
    }

    render() {
        const { mode, ...rest } = this.props;
        return (
            <>
                <Background color="black" {...rest} />
                {
                    this.props.mode === MenuMode.new || this.props.mode === MenuMode.continue
                        ? <MainScene root={this.root} />
                        : <Editor store={this.root.editorStore} />
                }
            </>
        );
    }
}

interface IProps {
    width: number;
    height: number;
}

@observer
export class Scene extends React.PureComponent<IProps> {

    render() {
        if (menuStore.mode === MenuMode.default) {
            return <Background color="black" {...this.props} />;
        }
        return (
            <SceneComponent {...this.props} mode={menuStore.mode} />
        );
    }
}
