import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  title = 'Household';
  loginBtn = 'Вход';

  constructor(private matDialog: MatDialog) {
  }

  openLoginForm(): void {
    this.matDialog.open(ModalComponent, {
      width: '325px',
    });
  }
}
