import {LeftMenuComponent} from "../../../catalog/left-menu/left-menu.component";
import {Component, OnDestroy} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {first} from 'rxjs/operators';
import {BaseAuthFormComponent} from "../base-auth-form/base-auth-form.component";
import {AlertService} from "../../../../services/alert.service";
import {Subscription} from "rxjs";
import {provideStore, Store} from "@ngrx/store";

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
    LeftMenuComponent,
    NgOptimizedImage
  ],
})
export class LoginFormComponent extends BaseAuthFormComponent implements OnDestroy {
  private subscription?: Subscription;

  constructor(
    formBuilder: FormBuilder,
    alertService: AlertService,
    store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private dialogRef: MatDialogRef<LoginFormComponent>,
  ) {
    super(formBuilder, alertService, store);
  }

  get f() {
    return this.authForm.controls;
  }

  override sendRequest(): void {
    this.subscription = this.accountService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: (): void  => {
          this.dialogRef.close();
          this.router.navigate(['/catalog/1']);
        },
        error: (error): void => {
          this.alertService.error(error.error);
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
