import React from "react";
import { Days, Task, TaskStatus } from "../models";

interface Props {
  day: Days;
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
  const tasks: Task[] = props.day && props.day.tasks ? props.day.tasks : [];

  return (
    <div className="task_cont">
      {tasks.length > 0 &&
        tasks.map((t, index: number) => (
          <div key={index} className={`task_item ${TaskStatus[t.status].toLowerCase()}`}>
            <div className="task_id">{t.id}.</div>
            <div className="task_content">{t.name}</div>
            <div className="task_status" dangerouslySetInnerHTML={{ __html: taskSatusText(t.status) }}></div>
          </div>
        ))}

      {tasks.length === 0 && <div>...</div>}
    </div>
  );
};

export default TaskList;
