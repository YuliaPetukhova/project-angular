import {Component} from '@angular/core';

@Component({
  selector: 'app-LOGIN-form',
  templateUrl: './LOGIN-form.component.html',
  styleUrls: ['./LOGIN-form.component.css'],
})
export class LoginFormComponent {

  LOGIN_HEADER = 'Вход';
  LOGIN = 'Войти';
  REGISTER = 'Регистрация';
  REGISTER_HEADER = 'Зарегистрироваться';
  FORGOT = 'Забыли пароль?';

  registerFormState = true;
  loginFormState = true;

  registerForm(){
    this.registerFormState = false;
    this.loginFormState = false;
  }
}

