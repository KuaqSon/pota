import { Days, GlobalState, Task, TaskStatus } from "../models";

enum CmdType {
  Task = "t",
  Edit = "e",
  Delete = "d",
  Unknow = "u",
  Begin = "b",
  Stop = "s",
  Finish = "f",
  Export = "ex",
  Reset = "reset",
}

interface Cmd {
  type: CmdType;
  data: string;
}

export const initToday = (): Days => {
  const now = new Date();
  const today: Days = {
    did: `${now.getDate()}`,
    date: now.toISOString().slice(0, 10),
    tasks: [],
  };

  return today;
};

export const defaultState: GlobalState = {
  days: [initToday()],
  spot: false,
};

export const newState = (state: GlobalState, cmd: string): GlobalState => {
  const cmdParser = parseCmd(cmd);

  switch (cmdParser.type) {
    case CmdType.Task:
      return newTask(state, cmdParser.data);
    case CmdType.Edit:
      return editTask(state, cmdParser.data);
    case CmdType.Delete:
      return deleteTask(state, cmdParser.data);
    case CmdType.Begin:
      return beginTask(state, cmdParser.data);
    case CmdType.Stop:
      return stopTask(state, cmdParser.data);
    case CmdType.Finish:
      return finishTask(state, cmdParser.data);
    case CmdType.Export:
      exportTasks(state, cmdParser.data);
      return state;
    case CmdType.Reset:
      return defaultState;

    case CmdType.Unknow:
      break;

    default:
      break;
  }

  return state;
};

const parseCmd = (cmd: string): Cmd => {
  const cmdParser: Cmd = { type: CmdType.Unknow, data: "" };
  if (!cmd) {
    return cmdParser;
  }

  const slugs = cmd
    .trim()
    .split(" ")
    .filter((x) => !!x);
  cmdParser.data = slugs.slice(1).join(" ");
  const type = slugs[0].toLowerCase();

  switch (type) {
    case "t":
    case "task":
      cmdParser.type = CmdType.Task;
      break;

    case "e":
    case "edit":
      cmdParser.type = CmdType.Edit;
      break;

    case "d":
    case "delete":
      cmdParser.type = CmdType.Delete;
      break;

    case "be":
    case "begin":
      cmdParser.type = CmdType.Begin;
      break;

    case "st":
    case "stop":
      cmdParser.type = CmdType.Stop;
      break;

    case "fi":
    case "finish":
      cmdParser.type = CmdType.Finish;
      break;

    case "ex":
    case "export":
      cmdParser.type = CmdType.Export;
      break;

    case "reset":
      cmdParser.type = CmdType.Reset;
      break;

    default:
      break;
  }

  return cmdParser;
};

const newTask = (state: GlobalState, data: string): GlobalState => {
  if (!data) {
    return state;
  }

  const slugs = data.split(" ");

  let activeDay = `${new Date().getDate()}`;
  let taskName = data;

  if (["d", "day"].indexOf(slugs[0].toLowerCase()) > -1 && slugs.length > 1) {
    activeDay = slugs[1];
    taskName = slugs.slice(2).join(" ");
  }

  if (!taskName) return state;

  state.days.forEach((day: Days) => {
    if (day.did === activeDay) {
      const id = day.tasks && day.tasks.length > 0 ? Math.max(...day.tasks.map((x) => Number(x.id))) + 1 : 1;
      day.tasks = [
        ...day.tasks,
        {
          id: `${id}`,
          name: taskName,
          status: TaskStatus.NotStarted,
        } as Task,
      ];
    }
  });

  return state;
};

const editTask = (state: GlobalState, data: string): GlobalState => {
  const slugs = data.trim().split(" ");
  if (slugs.length < 2) {
    return state;
  }

  let activeDay = `${new Date().getDate()}`;
  let id = slugs[0];
  let taskName = slugs.slice(1).join(" ");

  if (["d", "day"].indexOf(slugs[0].toLowerCase()) > -1 && slugs.length > 3) {
    activeDay = slugs[1];
    id = slugs[2];
    taskName = slugs.slice(3).join(" ");
  }

  if (!taskName) return state;

  state.days.forEach((day: Days) => {
    if (day.did === activeDay) {
      day.tasks.forEach((task: Task) => {
        if (task.id === id) {
          task.name = taskName;
        }
      });
    }
  });

  return state;
};

const updateTaskStatus = (state: GlobalState, data: string, status: TaskStatus) => {
  const slugs = data.split(" ");

  let activeDay = `${new Date().getDate()}`;
  let taskId = data;

  if (["d", "day"].indexOf(slugs[0].toLowerCase()) > -1 && slugs.length > 2) {
    activeDay = slugs[1];
    taskId = slugs[2];
  }

  if (!taskId) return state;

  state.days.forEach((day: Days) => {
    if (day.did === activeDay) {
      day.tasks.forEach((task: Task) => {
        if (task.id === taskId) {
          task.status = status;
        }
      });
    }
  });

  return state;
};

const beginTask = (state: GlobalState, data: string): GlobalState => {
  return updateTaskStatus(state, data, TaskStatus.Doing);
};

const stopTask = (state: GlobalState, data: string): GlobalState => {
  return updateTaskStatus(state, data, TaskStatus.Stop);
};

const finishTask = (state: GlobalState, data: string): GlobalState => {
  return updateTaskStatus(state, data, TaskStatus.Done);
};

const deleteTask = (state: GlobalState, data: string): GlobalState => {
  const slugs = data.split(" ");

  let activeDay = `${new Date().getDate()}`;
  let taskId = data;

  if (["d", "day"].indexOf(slugs[0].toLowerCase()) > -1 && slugs.length > 2) {
    activeDay = slugs[1];
    taskId = slugs[2];
  }

  if (!taskId) return state;

  state.days.forEach((day: Days) => {
    if (day.did === activeDay) {
      day.tasks = day.tasks.filter((t) => t.id !== taskId);
    }
  });

  return state;
};

const exportTasks = (state: GlobalState, data: string): void => {
  let tasks: Task[] = [];
  if (state.days.length === 0) {
    return;
  }

  if (data) {
    state.days.filter((day: Days) => day.did === data).forEach((day: Days) => (tasks = [...tasks, ...day.tasks]));
  } else {
    tasks = state.days[0].tasks;
  }
  navigator.clipboard.writeText(tasks.map((x) => `- ${x.name}`).join("\n"));
};
