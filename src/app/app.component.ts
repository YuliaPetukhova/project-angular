import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal/modal.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {

  title = 'Household';

  constructor(private matDialog: MatDialog){}

  openDialog(): void{
    this.matDialog.open(ModalComponent,{
      width: '350px',
    })

  }
}

