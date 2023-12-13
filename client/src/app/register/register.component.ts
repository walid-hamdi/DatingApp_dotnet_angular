import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

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
    MatRadioModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  @Output() onCancel = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  error: any[] = [];
  private accountService = inject(AccountService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.matchValues('password')],
      ],
    });

    this.registerForm.controls['password'].valueChanges.subscribe(() => {
      this.registerForm.controls['confirmPassword'].updateValueAndValidity();
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      const matchingControl = control.parent?.get(matchTo) as AbstractControl;

      return control?.value === matchingControl?.value
        ? null
        : { isMatching: true };
    };
  }

  register() {
    console.log(this.registerForm.value);
    this.accountService.register(this.registerForm.value).subscribe(
      (response) => {
        this.onCancel.emit(false);
        this.router.navigateByUrl('/members');
      },
      ({ error }) => {
        this.openErrorToast(error);
        // this.error = error;
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
