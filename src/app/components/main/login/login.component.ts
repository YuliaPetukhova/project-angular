import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],})
export class LoginComponent {

  loginForm: FormGroup;

  LOGIN_HEADER = 'Вход';
  LOGIN = 'Войти';
  REGISTER = 'Регистрация';
  REGISTER_HEADER = 'Зарегистрироваться';
  FORGOT = 'Забыли пароль?';
  BACK = 'Назад';

  registerFormState = false;
  loginFormState = true;


  // constructor(private authService: AuthService) {
  // }
  registerForm(){
    this.registerFormState = true;
    this.loginFormState = false;
  }

  loginFormChange(){
    this.registerFormState = false;
    this.loginFormState = true;
  }

  submitLogin() {
    // this.authService.login(this.loginForm.value).subscribe({
    //   next: () => this.router.navigate(['admin']),
    //   error: (err) => alert(err.message)
    // });
  }
}

