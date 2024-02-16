import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['../modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
})
export class RegisterFormComponent {

  registerForm: FormGroup;

  @Output() changeCurrentForm = new EventEmitter<string>();

  changeCurrentFormTo(currentForm: string) {
    this.changeCurrentForm.emit(currentForm)
  }

  submitForm() {
    // this.authService.modal(this.modalForm.value).subscribe({
    //   next: () => this.router.navigate(['admin']),
    //   error: (err) => alert(err.message)
    // });
  }
}
