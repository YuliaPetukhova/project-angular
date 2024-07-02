import {Component, Input, OnChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ITask} from 'src/app/store/models/ITask';
import {TaskItemComponent} from './task-item/task-item/task-item.component';
import {TasksService} from 'src/app/services/tasks.service';
import {IGroup} from "../../../store/models/IGroup";
import {AlertService} from 'src/app/services/alert.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
  standalone: true,
  imports: [MatCheckboxModule, CommonModule, TaskItemComponent],
})

export class TasksListComponent implements OnChanges {
  @Input() tasks: ITask[];
  @Input() currentGroup: IGroup;

  ngOnChanges(changes: any): void {
  }

  constructor(
    private serv: TasksService,
    private alertService: AlertService) {
  }

  onDelete(task: ITask): void {
    this.serv.deleteTask(task.id as number).subscribe({
      next: (data: ITask): void => {
        this.currentGroup.tasks.splice(
          this.currentGroup.tasks.findIndex((filteredTask: ITask) => filteredTask.id == data.id),
          1)
      },
      error: (error): void => {
        this.alertService.error(error);
      }
    });
  }

  onEdit(task: ITask): void {
    console.log(task);
    // this.serv.updateTask(task).subscribe((newTask)=> {
    //     this.currentGroup.tasks.replace(task, newTask);
    //     const taskIndex = this.currentGroup.tasks.findIndex((filteredTask) => filteredTask.id === task.id);
    //     this.currentGroup.tasks[taskIndex] = newTask;
    //   }
    // )
  }
}
