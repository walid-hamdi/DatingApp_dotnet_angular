import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface User {
  id: number;
  userName: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    return this.http
      .get<User[]>('https://localhost:5001/api/users')
      .subscribe((users) => {
        this.users = users;
      });
  }
}
