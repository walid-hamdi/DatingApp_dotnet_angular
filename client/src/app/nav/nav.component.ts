import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { UserLogin } from '../model/user';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatMenuModule,
    RouterModule,
  ],

  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  model: UserLogin = { username: '', password: '' };

  accountService = inject(AccountService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.model).subscribe(
      (response) => {
        this.router.navigateByUrl('/remember');
      },
      ({ error }) => {
        this.openErrorToast(error);
        this.model.username = '';
        this.model.password = '';
      }
    );
  }

  logout() {
    this.accountService.logout();
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
