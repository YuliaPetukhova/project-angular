import {Component, Input, OnChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ITask} from 'src/app/models/ITask';
import {TaskItemComponent} from './task-item/task-item/task-item.component';
import {TasksService} from 'src/app/services/tasks.service';
import {IGroup} from "../../../models/IGroup";
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

  ngOnChanges(changes) {
  }

  constructor(
    private serv: TasksService,
    private alertService: AlertService) {
  }

  onDelete(task: ITask) {
    this.serv.deleteTask(task.id as number).subscribe({
      next: (data) => {
        this.currentGroup.tasks.splice(
          this.currentGroup.tasks.findIndex((filteredTask) => filteredTask.id == data.id),
          1)
      },
      error: (error) => {
        this.alertService.error();
      }
    });
  }


  onEdit(task: ITask) {
    // this.serv.updateTask(task).subscribe((newTask)=> {
    //     this.currentGroup.tasks.replace(task, newTask);
    //     const taskIndex = this.currentGroup.tasks.findIndex((filteredTask) => filteredTask.id === task.id);
    //     this.currentGroup.tasks[taskIndex] = newTask;
    //   }
    // )
  }

}
