import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TasksService } from 'src/app/services/tasks.service';
import { ITask } from 'src/app/models/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
	public taskGroups: any;
  
	constructor(
	  private tasksService: TasksService,
	  public dialogRef: MatDialogRef<TaskFormComponent>,
	  @Optional()
	  @Inject(MAT_DIALOG_DATA)
	  public data: { groups: any; tasks: any }
	) {
	  this.taskGroups = window.structuredClone(data).groups;
	}
	ngOnInit(): void {}
  
	myFormTask = new FormGroup({
	  taskGroup: new FormControl<number>(0, [Validators.required]),
	  point: new FormControl('', [Validators.required, Validators.minLength(2)]),
	  text: new FormControl<string>('', [Validators.required]),
	});
  
	onSubmit() {
	  let formData: ITask = {
		text: this.myFormTask.value.text as string,
		taskGroupId: this.myFormTask.value.taskGroup ?? 1,
		createdAt: '',
		doneAt: '',
		deletedAt: '',
		price: 100,
	  };
  
	  this.tasksService.create(formData).subscribe((result) => {
		this.dialogRef.close();
		this.data.tasks.push(result);
	  });
  
	  this.dialogRef.close({ data: this.taskGroups });
	}
  
	addNewTaskGroup(newValue: string): void {
	  newValue = newValue.trim();
  
	  if (!newValue) {
		return;
	  }
  
	  this.taskGroups.unshift({ value: '', viewValue: newValue });
	}
  }
