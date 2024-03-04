import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {RegisterFormComponent} from "../register-form/register-form.component";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertService} from 'src/app/services/alert.service';

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
  submitted = false;
  loading = false;

  @Output() changeCurrentForm = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    protected alertService: AlertService
  ) {

  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  changeCurrentFormTo(currentForm: string) {
    this.changeCurrentForm.emit(currentForm)
  }

  changeCurrentFormToLogin() {
    this.changeCurrentFormTo('login')
  }

  changeCurrentFormToRegistration() {
    this.changeCurrentFormTo('registration')
  }

  onSubmit(toForm: string | null = null) {
    this.submitted = true;

    if (this.authForm.invalid) {
      return;
    }

    this.sendRequest();

    this.authForm.reset();

    if (toForm) {
      this.changeCurrentFormTo(toForm);
    }
  }

  sendRequest() {
  }
}
