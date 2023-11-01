import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal/modal.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
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

