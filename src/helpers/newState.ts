import { GlobalState, Task, TaskStatus } from "../models";

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

export const defaultState: GlobalState = {
  tasks: [],
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

  const slugs = cmd.trim().split(" ");
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

  const id =
    state.tasks && state.tasks.length > 0
      ? Math.max(...state.tasks.map((x) => Number(x.id))) + 1
      : 1;
  const tasks = [
    ...state.tasks,
    {
      id: `${id}`,
      name: data,
      status: TaskStatus.NotStarted,
    } as Task,
  ];
  return { ...state, tasks };
};

const editTask = (state: GlobalState, data: string): GlobalState => {
  const slugs = data.trim().split(" ");
  if (slugs.length < 2) {
    return state;
  }

  const id = slugs[0];
  const content = slugs.slice(1).join(" ");

  state.tasks.forEach((task) => {
    if (task.id === id) {
      task.name = content;
    }
  });

  return state;
};

const beginTask = (state: GlobalState, data: string): GlobalState => {
  state.tasks.forEach((task) => {
    if (task.id === data.trim()) {
      task.status = TaskStatus.Doing;
    }
  });

  return state;
};

const stopTask = (state: GlobalState, data: string): GlobalState => {
  state.tasks.forEach((task) => {
    if (task.id === data.trim()) {
      task.status = TaskStatus.Stop;
    }
  });

  return state;
};

const finishTask = (state: GlobalState, data: string): GlobalState => {
  state.tasks.forEach((task) => {
    if (task.id === data.trim()) {
      task.status = TaskStatus.Done;
    }
  });

  return state;
};

const deleteTask = (state: GlobalState, data: string): GlobalState => {
  const tasks = state.tasks.filter((t) => t.id !== data);
  return { ...state, tasks };
};

const exportTasks = (state: GlobalState, data: string): void => {
  let tasks = [];
  if (data) {
    const ids = data.split(" ").map((x) => x.trim());
    tasks = state.tasks
      .filter((x) => ids.indexOf(x.id) > -1)
      .map((x) => x.name.trim());
  } else {
    tasks = state.tasks.map((x) => x.name.trim());
  }
  navigator.clipboard.writeText(tasks.map((x) => `- ${x}`).join("\n"));
};
