import {ITask} from "./ITask";

export interface IGroup {
  createdAt: string;
  deletedAt: string;
  id: number;
  tasks: ITask[];
  title: string;
}
