import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLogin } from '../model/user';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @Output() onCancel = new EventEmitter();

  model: UserLogin = { username: '', password: '' };

  constructor(
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  register() {
    this.accountService.register(this.model).subscribe(
      (response) => {
        console.log(response);
        this.onCancel.emit(false);
      },
      ({ error }) => {
        this.openErrorToast(error);
        this.model.username = '';
        this.model.password = '';
      }
    );
  }

  cancel() {
    this.onCancel.emit(false);
  }

  openErrorToast(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // duration in milliseconds
      verticalPosition: 'top', // or 'bottom'
      horizontalPosition: 'center', // or 'start' | 'end' | 'left' | 'right'
      panelClass: ['error-toast'], // custom CSS class for styling
    });
  }
}
