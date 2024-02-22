import {LeftMenuComponent} from "../../../catalog/left-menu/left-menu.component";
import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, FormsModule, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Router, ActivatedRoute} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    LeftMenuComponent
  ],
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;


  @Output() changeCurrentForm = new EventEmitter<string>();

  changeCurrentFormTo(currentForm: string) {
    this.changeCurrentForm.emit(currentForm)
  }

  changeCurrentFormToRegistration() {
    this.changeCurrentFormTo('registration')
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private dialogRef: MatDialogRef<LoginFormComponent>,
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required, Validators.email],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  submitForm() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.accountService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.dialogRef.close();
          this.router.navigate(['/catalog/1']);
        }
      });

    this.loginForm.reset();
  }
}
