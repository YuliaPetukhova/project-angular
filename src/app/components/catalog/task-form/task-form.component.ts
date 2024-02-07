import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TasksService} from 'src/app/services/tasks.service';
import {ITask} from 'src/app/models/ITask';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  taskGroups: any;
  myFormTask: FormGroup;
  isEditForm: boolean;
  isCreateForm: boolean;

  constructor(
    private tasksService: TasksService,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    private data: { groups: any; tasks: any; currentTask: ITask }
  ) {
    this.taskGroups = window.structuredClone(data).groups;
    this.isEditForm = !!data.currentTask;
    this.isCreateForm = !this.isEditForm;

    this.myFormTask = new FormGroup({
      taskGroup: new FormControl<number>(data.currentTask?.taskGroupId, [Validators.required]),
      text: new FormControl<string>(data.currentTask?.text, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }


  trackByFn(index, taskGroup: ITask) {
    return taskGroup.id;
  }

  onSubmit() {
    this.tasksService.create({
      text: this.myFormTask.value.text as string,
      taskGroupId: this.myFormTask.value.taskGroup ?? 1,
      createdAt: '',
      doneAt: '',
      deletedAt: '',
      price: this.myFormTask.value.price as number,
    }).subscribe((result) => {
      this.data.tasks.push(result);
    });

    this.dialogRef.close({data: this.taskGroups});
  }

  addNewTaskGroup(newValue: string): void {
    newValue = newValue.trim();

    if (!newValue) {
      return;
    }

    this.taskGroups.unshift({id: '', title: newValue});
  }
}
