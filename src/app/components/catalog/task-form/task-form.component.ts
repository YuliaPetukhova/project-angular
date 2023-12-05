import { Component, Inject, OnInit, Optional, ChangeDetectionStrategy  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';
import { ITask } from 'src/app/models/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
//   changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent implements OnInit {
	taskGroups: any;
  
	constructor(
	  private tasksService: TasksService,
	  private dialogRef: MatDialogRef<TaskFormComponent>,
	  @Optional()
	  @Inject(MAT_DIALOG_DATA)
	  private data: { groups: any; tasks: any }
	) {
	  this.taskGroups = window.structuredClone(data).groups;
	}
	ngOnInit(): void {}
  
	myFormTask = new FormGroup({
	  taskGroup: new FormControl<number>(0, [Validators.required]),
	  text: new FormControl<string>('', [Validators.required]),
	});

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
	  }).subscribe((result) => {
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
