import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { USER_KEY } from './model/constants';
import { AccountService } from './account.service';
import { User, UserProfile } from './model/user';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    MatCardModule,
    NavComponent,
    HomeComponent,
  ],
  providers: [AccountService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api';
  users: UserProfile[] = [];

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    const user: User | null = JSON.parse(localStorage.getItem(USER_KEY) ?? '');
    this.accountService.setCurrentUser(user);
    this.getUsers();
  }

  getUsers() {
    return this.http
      .get<UserProfile[]>(`${this.baseUrl}/users`)
      .subscribe((users) => {
        this.users = users;
      });
  }
}
