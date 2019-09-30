import { configure as mobXConfig } from "mobx";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

mobXConfig({ enforceActions: "observed" });

ReactDOM.render(<App />, document.getElementById("root"));
