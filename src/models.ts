export interface GlobalState {
  tasks: Task[];
  spot: boolean;
}

export interface Task {
  name: string;
  id: string;
  status: TaskStatus;
  lastModify: Date;
}

export enum TaskStatus {
  NotStarted = 0,
  Doing = 1,
  Stop = 2,
  Done = 3,
}
