import { CommonModule } from '@angular/common';
import { OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Component, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ITask } from 'src/app/models/task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  standalone: true,
  imports: [MatCheckboxModule, CommonModule],
})
export class TaskItemComponent implements OnInit {
  @ViewChild('readOnlyTemplate', { static: false })
  readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', { static: false })
  editTemplate: TemplateRef<any>;

  @Input() task: ITask;

  constructor(private serv: TasksService) {
    this.tasks = new Array<ITask>();
  }
  ngOnInit(){
    this.loadTasks();
  }

  editedTask: ITask;
  tasks: Array<ITask>;
  statusMessage: string;
  isNewRecord: boolean;

  editTask() {
    this.editedTask = {
      id: 0,
      text: 'this.myFormTask.value.text as string',
      taskGroupId: 1,
      createdAt: '',
      doneAt: '',
      deletedAt: '',
    };
    // this.editedTask = new ITask(
    // task.id,
    // task.createdAt,
    // task.taskGroupId,
    //     task.text
    // );
  }

  private loadTasks() {
    this.serv.getAll().subscribe((data) => {
        this.tasks = data;
    });
}
// сохраняем пользователя
saveTask() {
    if (this.isNewRecord) {
        // добавляем пользователя
        this.serv
            .create(this.editedTask)
            .subscribe((data) => {
                (this.statusMessage =
                    'Данные успешно добавлены'),
                    this.loadTasks();
            });
        this.isNewRecord = false;
        // this.editedTask = null;
    } else {
        // изменяем пользователя
        this.serv
            .updateTask(
                this.editedTask.id as number,
                this.editedTask
            )
            .subscribe((data) => {
                (this.statusMessage =
                    'Данные успешно обновлены'),
                    this.serv.getAll();
            });
        // this.editedTask = null;
    }
}

deleteTask() {
    this.serv.deleteTask(this.task.id as number).subscribe((data) => {
		// const key = this.tasks.filter(task => {
			// return task.id === this.task.id;
		// });
		// this.tasks.removeByKey(key);splice
      (this.statusMessage = 'Данные успешно удалены'),  this.loadTasks();
    });
  }
}