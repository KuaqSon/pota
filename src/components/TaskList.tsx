import React from "react";
import { GlobalState, Task, TaskStatus } from "../models";

interface Props {
  state: GlobalState;
}

const taskSatusText = (status: TaskStatus): string => {
  switch (status) {
    case TaskStatus.Doing:
      return "Doing";
    case TaskStatus.Done:
      return "Done";
    case TaskStatus.NotStarted:
      return "Not <br> Started";
    case TaskStatus.Stop:
      return "Stop";

    default:
      return "";
  }
};

const TaskList = (props: Props) => {
  const tasks: Task[] = props.state && props.state.tasks ? props.state.tasks : [];

  return (
    <div className="task_cont">
      {tasks.map((t, index: number) => (
        <div key={index} className="task_item">
          <div className={`task_id ${TaskStatus[t.status].toLowerCase()}`}>
            {t.id}.<div className="task_status" dangerouslySetInnerHTML={{ __html: taskSatusText(t.status) }}></div>
          </div>
          <div className="task_content">{t.name}</div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
