import {ITask} from "./ITask";

export interface IGroup {
  id: number;
  title: string;
  createdAt: string;
  deletedAt: string;
  tasks: ITask[];
}
