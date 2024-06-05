import {CommonModule, CurrencyPipe, DecimalPipe, DatePipe} from '@angular/common';
import {Component, EventEmitter, Input, Output, NgModule, LOCALE_ID} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ITask} from 'src/app/models/ITask';
import {IGroup} from "../../../../../models/IGroup";
import {SharingService} from "../../../../../services/sharing/sharing.service";
import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
registerLocaleData(localeRu);

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  standalone: true,
  imports: [MatCheckboxModule, CommonModule, NgbRatingModule],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru'}
  ]
})
export class TaskItemComponent {
  constructor(private sharingService: SharingService) {
  }

  tasks: Array<ITask>;

  @Input() task: ITask;
  @Input() group: IGroup;
  @Output() onDelete: EventEmitter<ITask> = new EventEmitter<ITask>();

  deleteTask(task: ITask): void {
    this.onDelete.emit(task);
  }

  @Output() onEdit: EventEmitter<ITask> = new EventEmitter<ITask>();

  editTask(task: ITask): void {
    this.sharingService.setDataTask(task);
  }
}
