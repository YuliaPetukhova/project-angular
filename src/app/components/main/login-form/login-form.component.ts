import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  constructor(private matDialog: MatDialog) {}

  openDialog(): void {
    this.matDialog.open(LoginFormComponent, {
      width: '325px',
    });
  }
}
