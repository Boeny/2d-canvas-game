import { configure as mobXConfig } from "mobx";
import "reflect-metadata";
import { useStrictMode } from "react-konva";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

useStrictMode(true);
mobXConfig({ enforceActions: "observed" });

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("root"));
