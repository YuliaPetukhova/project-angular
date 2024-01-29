import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ITask} from 'src/app/models/ITask';
import {IGroup} from "../../../../../models/IGroup";
import {SharingService} from "../../../../../services/sharing/sharing.service";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  standalone: true,
  imports: [MatCheckboxModule, CommonModule],
})
export class TaskItemComponent {

  constructor(private sharingService: SharingService) {
  }


  tasks: Array<ITask>;
  statusMessage: string;

  @Input() task: ITask;
  @Input() group: IGroup;

  @Output() onDelete = new EventEmitter<ITask>();

  deleteTask(task: ITask) {
    this.onDelete.emit(task);
  }

  @Output() onEdit = new EventEmitter<ITask>();

  editTask(task: ITask) {
    this.sharingService.setDataTask(task);
  }

}
