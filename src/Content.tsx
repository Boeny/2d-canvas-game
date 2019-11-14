import React from "react";
import { Scenes } from "./Scenes";
import { GUI, Menu } from "./components";
import { CompositionRoot } from "models";

interface IProps {
    root: CompositionRoot;
}

export function Content(props: IProps) {

    const { root } = props;

    return (
        <>
            <GUI>
                <Menu onNew={() => root.init()} />
            </GUI>
            <Scenes root={root} />
        </>
    );
}
