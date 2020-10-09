import React from "react";
import { Days, GlobalState } from "../models";
import TaskList from "./TaskList";

interface Props {
  state: GlobalState;
}

const DayList = (props: Props) => {
  const days: Days[] = props.state && props.state.days ? props.state.days : [];

  return (
    <div className="day_cont">
      {days.map((t, index: number) => (
        <div key={index} className={index === 0 ? "day_item current" : "day_item"}>
          <div className="date_label">{new Date(t.date).toString().slice(0, 11)}</div>
          <TaskList day={t} />
        </div>
      ))}
    </div>
  );
};

export default DayList;
