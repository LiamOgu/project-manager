export interface ProjectStatsInterface {
  _id: string;
  name: string;
  nbTotalTasks: number;
  nbInProgressTasks: number;
  nbCompletedTasks: number;
  nbTodoTasks: number;
  createdAt: string;
}
