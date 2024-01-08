import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ITask } from 'src/app/models/ITask';
import { TaskItemComponent } from './task-item/task-item/task-item.component';
import { TasksService } from 'src/app/services/tasks.service';
import { IGroupTitle } from 'src/app/models/IGroupTitle';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
  standalone: true,
  imports: [MatCheckboxModule, CommonModule, TaskItemComponent],
})
export class TasksListComponent {
  editedTask: ITask;
  @Input() groups: IGroupTitle[];
  @Input() tasks: ITask[];

  constructor(private serv: TasksService, private matDialog: MatDialog) {}

  onDelete(task: ITask) {
    this.serv.deleteTask(task.id as number).subscribe((data) => {
      this.tasks.splice(
        this.tasks.findIndex((filteredTask) => filteredTask.id === task.id),
        1
      );
    });
  }

  onEdit(task: ITask) {
    const dialog = this.matDialog.open(TaskFormComponent, {
      data: {
        groups: this.groups,
        tasks: this.tasks,
        currentTask: task,
      },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result && result.data && result.data.length > this.groups.length) {
        this.groups = result.data;
      }
    });

    // this.serv.updateTask(task).subscribe((newTask) => {
    //   // this.tasks.replace(task, newTask); js array replace element
    //   // const taskIndex = this.tasks.findIndex((filteredTask) => filteredTask.id === task.id);
    //   // this.tasks[taskIndex] = newTask;
    // }
    // )
    // this.editedTask = {
    //     id: 0,
    //     text: 'this.myFormTask.value.text as string',
    //     taskGroupId: 1,
    //     createdAt: '',
    //     doneAt: '',
    //     deletedAt: '',
    //   };
  }
}
