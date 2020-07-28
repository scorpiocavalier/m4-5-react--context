import React from "react";
import ReactDOM         from "react-dom"
import App              from "./components/App"
import { GameProvider } from "./components/GameContext"

ReactDOM.render(
  <GameProvider>
    <App />
  </GameProvider>,
  document.getElementById("root")
)