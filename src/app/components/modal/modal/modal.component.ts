import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent {
  constructor(private matDialog: MatDialog){}

  openDialog(): void{
    this.matDialog.open(ModalComponent,{
      width: '325px',
    })
}
}

