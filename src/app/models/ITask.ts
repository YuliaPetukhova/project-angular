export interface ITask {
  createdAt: string;
  deletedAt: string;
  doneAt: string;
  id?: number;
  taskGroupId: number;
  text: string;
}
