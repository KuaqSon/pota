import React from "react";
import { GlobalState, Task, TaskStatus } from "../models";
import { ReactComponent as AllIcon } from "../assets/all.svg";
import { ReactComponent as DoingIcon } from "../assets/doing.svg";
import { ReactComponent as DoneIcon } from "../assets/done.svg";
import { ReactComponent as ScheduleIcon } from "../assets/schedule.svg";

interface CmdDesc {
  cmd: string;
  desc: string;
}

const cmds: CmdDesc[] = [
  {
    cmd: "Press ENTER",
    desc: "to START",
  },
  {
    cmd: "Press ESC",
    desc: "Cancel",
  },
  {
    cmd: "[task / t]  <Task Name>",
    desc: "Create new task",
  },
  {
    cmd: "[edit / e]  <Task ID> <New Task Name>",
    desc: "Edit task name",
  },
  {
    cmd: "[delete / d] <Task ID> <Task ID> <Task ID> ...",
    desc: "Delete task by ID",
  },
  {
    cmd: "[begin / be] <Task ID>",
    desc: "Begin a task by ID",
  },
  {
    cmd: "[stop / st] <Task ID>",
    desc: "Stop a task by ID",
  },
  {
    cmd: "[finish / fi] <Task ID>",
    desc: "Finish a task by ID",
  },
  {
    cmd: "[export / ex]",
    desc: "Export all tasks",
  },
  {
    cmd: "[export / ex] <Task ID> <Task ID> <Task ID> ..",
    desc: "Export task list by IDs",
  },
  {
    cmd: "[reset]",
    desc: "Reset the board",
  },
];

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
  const tasks: Task[] =
    props.state && props.state.tasks ? props.state.tasks : [];

  const doing = tasks.filter((x) => x.status === TaskStatus.Doing).length;
  const done = tasks.filter(
    (x) => x.status === TaskStatus.Done || x.status === TaskStatus.Stop
  ).length;
  const notStarted = tasks.filter((x) => x.status === TaskStatus.NotStarted)
    .length;

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
        <div className="help_cmd">
          {cmds.map((c, index) => (
            <div key={index} className="cmd_item">
              <div className="cmd_type">{c.cmd}</div>
              <div className="cmd_desc">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Summary;
