import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginFormComponent} from '../login-form/login-form.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  title = 'Household';

  constructor(private matDialog: MatDialog) {
  }

  openLoginForm(): void {
    this.matDialog.open(LoginFormComponent, {
      width: '325px',
    });
  }
}
