export interface TaskCardInterface {
  _id?: string;
  title: string;
  status: "todo" | "in_progress" | "done";
  createdAt: string;
}

export interface TaskDetailsInterface extends TaskCardInterface {
  description: string;
}

export interface TasksInterface extends TaskCardInterface {
  description: string;
  projectId: string;
}
