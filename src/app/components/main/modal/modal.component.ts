import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {LoginFormComponent} from "./login-form/login-form.component";
import {RegisterFormComponent} from "./register-form/register-form.component";
import {LeftMenuComponent} from "../../catalog/left-menu/left-menu.component";
import {BottomMenuComponent} from "../../catalog/bottom-menu/bottom-menu.component";
import {BaseAuthFormComponent} from "./base-auth-form/base-auth-form.component";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    LoginFormComponent,
    RegisterFormComponent,
    LeftMenuComponent,
    BottomMenuComponent,
    BaseAuthFormComponent
  ],
})
export class ModalComponent {
  LOGIN_FORM = 'login';
  REGISTRATION_FORM = 'registration';

  currentForm = this.LOGIN_FORM;

  changeForm(currentForm) {
    this.currentForm = currentForm;
  }
}
