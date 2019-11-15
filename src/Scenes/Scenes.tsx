import React from "react";
import { observer } from "mobx-react";
import { CompositionRoot } from "models";
import { Mode } from "enums";
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
            case Mode.default:
                return <WelcomeScene />;
            case Mode.new:
            case Mode.continue:
                return <MainScene root={root} />;
            case Mode.edit:
                return <EditorScene store={root.editorStore} />;
        }
    }
}
