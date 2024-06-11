import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {first} from 'rxjs/operators';
import {BaseAuthFormComponent} from "../base-auth-form/base-auth-form.component";
import {AlertService} from "../../../../services/alert.service";


@Component({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgOptimizedImage,
  ],
  selector: 'app-register-form',
  standalone: true,
  styleUrls: ['../modal.component.css'],
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent extends BaseAuthFormComponent {

  constructor(
    formBuilder: FormBuilder,
    alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
  ) {
    super(formBuilder, alertService);
  }

  override sendRequest(): void {
    this.accountService.register(this.authForm.value)
      .pipe(first())
      .subscribe({
        next: (): void => {
          this.router.navigate([''], {relativeTo: this.route});
        },
        error: (error): void => {
          this.alertService.error(error.error);
        }
      });
  }

}
