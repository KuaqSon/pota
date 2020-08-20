import React, { useState, useEffect } from "react";
import { ReactComponent as CommandIcon } from "../assets/command.svg";

interface CmdDesc {
  cmd: string;
  desc: string;
}

interface Props {
  visible: boolean;
  onSubmit: Function;
}

const cmds: CmdDesc[] = [
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
  {
    cmd: "Press ESC",
    desc: "Cancel",
  },
];

const Spotlight = (props: Props) => {
  const { visible = false } = props;
  const [cmd, setCmd] = useState("");

  useEffect(() => {
    // Clear cmd whenever open/close spotlight
    setCmd("");
  }, [visible]);

  const onSpotChange = (e: any) => {
    const text = e.target.value;
    setCmd(text);
  };

  const submit = (e: any) => {
    e.preventDefault();
    if (props.onSubmit) {
      props.onSubmit(cmd);
    }
  };

  return visible ? (
    <div className="spot-cont">
      <form onSubmit={(e) => submit(e)}>
        <div className="input_wrapper">
          <div className="input_icon">
            <CommandIcon />
          </div>
          <input value={cmd} onChange={onSpotChange} autoFocus={true} placeholder="Type here..." autoComplete="false" />
        </div>
      </form>

      <div className="help_cmd">
        {cmds.map((c, index) => (
          <div key={index} className="cmd_item">
            <div className="cmd_type">{c.cmd}</div>
            <div className="cmd_desc">{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Spotlight;
