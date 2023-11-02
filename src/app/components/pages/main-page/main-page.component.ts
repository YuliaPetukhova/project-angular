import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal/modal.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  title = 'Household';

  constructor(private matDialog: MatDialog){}

  openDialog(): void{
    this.matDialog.open(ModalComponent,{
      
    })

  }
}