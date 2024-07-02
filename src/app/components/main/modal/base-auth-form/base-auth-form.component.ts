import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {RegisterFormComponent} from "../register-form/register-form.component";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertService} from 'src/app/services/alert.service';
import {Store} from '@ngrx/store';
import {selectError, selectIsLoading, selectToken} from 'src/app/store/login/login.selectors';
import {login} from 'src/app/store/login/login.actions';

@Component({
  imports: [
    RegisterFormComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  selector: 'app-base-auth-form',
  standalone: true,
  styleUrls: ['./base-auth-form.component.css'],
  templateUrl: './base-auth-form.component.html'
})
export class BaseAuthFormComponent implements OnInit {

  authForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  token: string = '';
  error: string = '';
  user: string = '';
  email: string = '';

  @Output() changeCurrentForm: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    protected alertService: AlertService,
    private store: Store,
  ) {
    this.store.select(selectToken).subscribe(token => (this.token = token));
    this.store.select(selectError).subscribe(error => (this.error = error));
    this.store.select(selectIsLoading).subscribe(loading => (this.loading = loading));
  }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  changeCurrentFormTo(currentForm: string): void {
    this.changeCurrentForm.emit(currentForm)
  }

  changeCurrentFormToLogin(): void {
    this.changeCurrentFormTo('login')
  }

  changeCurrentFormToRegistration(): void {
    this.changeCurrentFormTo('registration')
  }

  onSubmit(toForm: string | null = null): void {
    this.submitted = true;

    if (this.authForm.invalid) {
      return;
    }

    this.store.dispatch
    (login({user: this.authForm.controls.email.value, password: this.authForm.controls.password.value}));

    this.sendRequest();
    this.authForm.reset();

    if (toForm) {
      this.changeCurrentFormTo(toForm);
    }
  }

  sendRequest(): void {
  }
}
