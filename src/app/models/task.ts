import { UrlCreationOptions } from '@angular/router';

export interface ITask {
  id?: number;
  text: string;
  taskGroupId: number;
  createdAt: string;
  doneAt: string;
  deletedAt: string;
  price: number;
}
