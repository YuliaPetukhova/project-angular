import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskPageComponent } from '../../task-page.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.sass'],
})
export class NewTaskModalComponent {
  public groups: any;

  constructor(
    public dialogRef: MatDialogRef<NewTaskModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { groups: any }
  ) {
    dialogRef.disableClose = true;
  }
  doAction() {
    this.dialogRef.close({ data: this.data.groups });
  }


  add(newValue: string): void {
    newValue = newValue.trim();
    if (!newValue) {
      return;
    }
    this.data.groups.unshift({ value: '', viewValue: newValue });
  }
}
