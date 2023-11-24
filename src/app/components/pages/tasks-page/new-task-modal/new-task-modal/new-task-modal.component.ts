import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

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
  styleUrls: ['./new-task-modal.component.сss'],
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

  onSubmit() {
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
      this.data.tasks.push(result);
    });

    this.dialogRef.close({ data: this.taskGroups });
  }

  add(newValue: string): void {
    newValue = newValue.trim();

    if (!newValue) {
      return;
    }

    this.taskGroups.unshift({ value: '', viewValue: newValue });
  }
}
