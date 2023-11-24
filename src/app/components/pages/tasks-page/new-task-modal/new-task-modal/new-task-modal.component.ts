import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroupDirective,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

import { TaskPageComponent } from '../../task-page.component';
import { Dialog } from '@angular/cdk/dialog';
import { TasksService } from 'src/app/services/tasks.service';
import { ITask } from 'src/app/models/task';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.sass'],
})
export class NewTaskModalComponent implements OnInit {
  public taskGroups: any;

  constructor(
    private tasksService: TasksService,
    public dialogRef: MatDialogRef<NewTaskModalComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: { groups: any; tasks: any }
  ) {
    this.taskGroups = window.structuredClone(data).groups;
  }
  ngOnInit(): void {}

  myForm = new FormGroup({
    taskGroup: new FormControl<number>(0, [Validators.required]),
    point: new FormControl('', [Validators.required, Validators.minLength(2)]),
    text: new FormControl<string>('', [Validators.required]),
  });

  // @ViewChild('testForm') someNewNameFrom: NgForm | null = null;
  onSubmit() {
    console.log('working');
    // console.log(this.someNewNameFrom);
    console.log(this.myForm.value);

    let formData: ITask = {
      text: this.myForm.value.text as string,
      taskGroupId: this.myForm.value.taskGroup ?? 1,
      createdAt: '',
      doneAt: '',
      deletedAt: '',
      price: 100,
    };

    this.tasksService.create(formData).subscribe((result) => {
      this.dialogRef.close();
      console.log("result99")
      console.log(result)
    });

    this.dialogRef.close({ data: this.taskGroups });
    console.log('this.data.tasks');
    console.log(this.data.tasks);
    
  }

  // doAction() {
  // this.tasksService.getAll().subscribe((result) => {
  // 	console.log(result)
  //   })
  // let re = this.tasksService.getAll();
  // console.log(re)
  // this.tasksService.create(

  //   {
  //   id: 5,
  //   text: 'hanuka',
  //   taskGroupId: 1,
  //   createdAt: '02/11/23',
  //   doneAt: '05/11/23',
  //   deletedAt: '06/11/23',
  //   price: 300,
  // }
  // ).subscribe(()=>{

  // this.dialogRef.close();
  // });
  // this.dialogRef.close({ data: this.taskGroups });
  // }

  add(newValue: string): void {
    newValue = newValue.trim();

    if (!newValue) {
      return;
    }

    this.taskGroups.unshift({ value: '', viewValue: newValue });
  }
}
