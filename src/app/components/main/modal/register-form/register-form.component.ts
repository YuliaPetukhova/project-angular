import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, FormsModule, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {Router, ActivatedRoute} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {first} from 'rxjs/operators';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  selector: 'app-register-form',
  standalone: true,
  styleUrls: ['../modal.component.css'],
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent implements OnInit {

  registrationForm!: FormGroup;
  submitted = false;


  @Output() changeCurrentForm = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
  ) {
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: [null, Validators.required, Validators.email],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  changeCurrentFormTo(currentForm: string) {
    this.changeCurrentForm.emit(currentForm)
  }

  changeCurrentFormToLogin() {
    this.changeCurrentFormTo('login')
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    this.accountService.register(this.registrationForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate([''], {relativeTo: this.route});
        }
      });

    this.registrationForm.reset();
    this.changeCurrentFormToLogin();
  }

}

