import React from "react";
import "./app.scss";

import { useEffect, useState } from "react";
import tinykeys from "tinykeys";
import { GlobalState } from "./models";
import Spotlight from "./components/Spotlight";
import { newState, defaultState } from "./helpers/newState";
import Summary from "./components/Summary";
import TaskList from "./components/TaskList";

const getInitialState = () => {
  if (window.localStorage) {
    const saved = window.localStorage.getItem("pota");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) {
          return { ...parsed, spot: false } as GlobalState;
        }
      } catch {}
    }
  }
  return defaultState;
};

function App() {
  const [state, setState] = useState(getInitialState());

  React.useEffect(() => {
    window.localStorage.setItem("pota", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    let unsubscribe = tinykeys(window, {
      Escape: () => {
        setState({ ...state, spot: false });
      },
      Space: () => {
        if (state.spot) {
          return;
        }
        setState({ ...state, spot: true });
      },
    });
    return () => {
      unsubscribe();
    };
  });

  const handleSpotlightSubmit = (cmd: string) => {
    const newst = { ...newState(state, cmd), spot: false };
    setState(newst);
  };

  return (
    <>
      <Spotlight visible={state.spot} onSubmit={handleSpotlightSubmit} />
      <div className="app_cont">
        <Summary state={state} />
        <TaskList state={state} />
      </div>
    </>
  );
}

export default App;
