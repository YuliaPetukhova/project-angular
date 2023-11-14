import { UrlCreationOptions } from '@angular/router';

export interface ITask {
  id?: number;
  date: string;
  price: number;
  description: string;
  category: string;
}
