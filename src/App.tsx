import React from "react";
import "./app.scss";

import { useEffect, useState } from "react";
import tinykeys from "tinykeys";
import { Days, GlobalState } from "./models";
import Spotlight from "./components/Spotlight";
import { newState, defaultState, initToday } from "./helpers/newState";
import Summary from "./components/Summary";
import DayList from "./components/DayList";

const getInitialState = () => {
  if (window.localStorage) {
    const saved = window.localStorage.getItem("pota");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) {
          const today = initToday();
          let initState = { ...parsed, spot: false } as GlobalState;

          if (initState.days[0].did !== today.did) {
            initState.days = [today, ...initState.days.filter((day: Days) => day.did !== today.did)];
          }

          return initState;
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
      Enter: () => {
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
        <DayList state={state} />
      </div>
    </>
  );
}

export default App;
