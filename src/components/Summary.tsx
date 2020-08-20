import React from "react";
import { GlobalState, Task, TaskStatus } from "../models";
import { ReactComponent as AllIcon } from "../assets/all.svg";
import { ReactComponent as DoingIcon } from "../assets/doing.svg";
import { ReactComponent as DoneIcon } from "../assets/done.svg";
import { ReactComponent as ScheduleIcon } from "../assets/schedule.svg";

const Today = () => {
  const now = new Date().toString();
  const day = now.slice(0, 4);
  const date = now.slice(4, 15);

  return (
    <div className="today_title">
      <strong>{day}</strong> {date}
      <div className="main_title">
        Simple <strong>Task Management</strong>
      </div>
      <div className="main_title">Made by Quang Son with ❤</div>
    </div>
  );
};

interface Props {
  state: GlobalState;
}

const Summary = (props: Props) => {
  const tasks: Task[] = props.state && props.state.tasks ? props.state.tasks : [];

  const doing = tasks.filter((x) => x.status === TaskStatus.Doing).length;
  const done = tasks.filter((x) => x.status === TaskStatus.Done || x.status === TaskStatus.Stop).length;
  const notStarted = tasks.filter((x) => x.status === TaskStatus.NotStarted).length;

  return (
    <div>
      <Today />
      <div className="summary">
        <div className="summary_item">
          <div className="sum_desc">
            <div className="icon_wrap total">
              <AllIcon />
            </div>
            Total
          </div>
          <div className="sum_indi">{tasks.length}</div>
        </div>
        <div className="summary_item">
          <div className="sum_desc">
            <div className="icon_wrap doing">
              <DoingIcon />
            </div>
            Doing
          </div>
          <div className="sum_indi">{doing}</div>
        </div>
        <div className="summary_item">
          <div className="sum_desc">
            <div className="icon_wrap done">
              <DoneIcon />
            </div>
            Done
          </div>
          <div className="sum_indi">{done}</div>
        </div>
        <div className="summary_item">
          <div className="sum_desc">
            <div className="icon_wrap not_started">
              <ScheduleIcon />
            </div>
            Not Started
          </div>
          <div className="sum_indi">{notStarted}</div>
        </div>
      </div>
      <div className="help_box">Press "SPACE" to start</div>
      <div className="help_box">Press "ESC" to cancel</div>
    </div>
  );
};

export default Summary;
