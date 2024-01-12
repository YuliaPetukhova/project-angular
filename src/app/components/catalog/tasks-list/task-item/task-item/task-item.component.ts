import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild,} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ITask} from 'src/app/models/ITask';
import {IGroup} from "../../../../../models/IGroup";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  standalone: true,
  imports: [MatCheckboxModule, CommonModule],
})
export class TaskItemComponent {
  @ViewChild('readOnlyTemplate', { static: false })
  readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', { static: false })
  editTemplate: TemplateRef<any>;

  @Input() task: ITask;
  @Input() group: IGroup;

  @Output() onDelete = new EventEmitter<ITask>();
  deleteTask(task: ITask) {
    this.onDelete.emit(task);
  }

  @Output() onEdit = new EventEmitter<ITask>();
  editTask(task: ITask) {
    this.onEdit.emit(task);
  }

  // constructor(private serv: TasksService) {
  //   this.tasks = [];
  // }

  editedTask: ITask;
  tasks: Array<ITask>;
  statusMessage: string;
  isNewRecord: boolean;

  // editTask(task: ITask) {
  //   this.editedTask = {
  //     id: 0,
  //     text: 'this.myFormTask.value.text as string',
  //     taskGroupId: 1,
  //     createdAt: '',
  //     doneAt: '',
  //     deletedAt: '',
  //   };
  //   // this.editedTask = new ITask(
  //   // task.id,
  //   // task.createdAt,
  //   // task.taskGroupId,
  //   //     task.text
  //   // );
  // }
  // сохраняем пользователя
  // saveTask() {
  //   if (this.isNewRecord) {
  //     // добавляем пользователя
  //     this.serv.create(this.editedTask).subscribe((data) => {
  //       // (this.statusMessage = 'Данные успешно добавлены'), this.loadTasks();
  //     });
  //     this.isNewRecord = false;
  //     // this.editedTask = null;
  //   } else {
  //     // изменяем пользователя
  //     this.serv
  //       .updateTask(this.editedTask.id as number, this.editedTask)
  //       .subscribe((data) => {
  //         (this.statusMessage = 'Данные успешно обновлены'), this.serv.getAll();
  //       });
  //     // this.editedTask = null;
  //   }
  // }
}
