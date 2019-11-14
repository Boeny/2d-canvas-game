import React from "react";
import { observer } from "mobx-react";
import { CompositionRoot } from "models";
import { MenuMode } from "enums/MenuMode";
import { menuStore } from "stores";
import { WelcomeScene } from "./WelcomeScene";
import { MainScene } from "./MainScene";
import { EditorScene } from "./EditorScene";

interface IProps {
    root: CompositionRoot;
}

@observer
export class Scenes extends React.PureComponent<IProps> {

    render() {

        const { root } = this.props;

        switch (menuStore.mode) {
            case MenuMode.default:
                return <WelcomeScene containerStore={root.containerStore} />;
            case MenuMode.continue:
            case MenuMode.new:
                return <MainScene root={root} />;
            case MenuMode.edit:
                return <EditorScene editorStore={root.editorStore} containerStore={root.containerStore} />;
        }
    }
}
