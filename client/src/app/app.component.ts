import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { USER_KEY } from './model/constants';
import { AccountService } from './services/account.service';
import { User, UserProfile } from './model/user';
import { HomeComponent } from './home/home.component';
import { HttpClient } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PresenceService } from './services/presence.service';

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
    NgxSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api';

  http = inject(HttpClient);
  accountService = inject(AccountService);
  presence = inject(PresenceService);

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const user: User | null = JSON.parse(localStorage.getItem(USER_KEY)!);
      if (user) {
        this.accountService.setCurrentUser(user);
        this.presence.createHubConnection(user);
      }
    }
  }

  // Add guards
  // Add Theme
  // Add Shared Module

  // TODO: add gallery photos (use detailed page)
  // CanDeactivate : for prevent exit before you apply the changes

  // TODO: outbox data are wrong , it should show the message of the logged in profile
  // and i shouldn't enter when i click to it because it's my profile

  // TODO: Handle the login and logout issue
}
