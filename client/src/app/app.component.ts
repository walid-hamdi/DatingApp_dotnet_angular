import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { USER_KEY } from './model/constants';
import { AccountService } from './account.service';
import { User, UserProfile } from './model/user';
import { HomeComponent } from './home/home.component';
import { HttpClient } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatCardModule,
    NavComponent,
    HomeComponent,
    ErrorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api';

  http = inject(HttpClient);
  accountService = inject(AccountService);

  ngOnInit(): void {
    const user: User | null = JSON.parse(localStorage.getItem(USER_KEY)!);
    this.accountService.setCurrentUser(user);
  }

  // Add guards
  // Add Theme
  // Add Shared Module

  // TODO: add gallery photos (use detailed page)
  // CanDeactivate : for prevent exit before you apply the changes
}
