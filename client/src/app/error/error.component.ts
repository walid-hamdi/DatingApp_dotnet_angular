import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
  baseUrl = 'https://localhost:5001/api';
  errors: [] = [];
  // constructor(private http: HttpClient) {}
  http = inject(HttpClient);

  get400Error() {
    this.http.get(`${this.baseUrl}/buggy/bad-request`).subscribe({
      next: (req) => {},
      error: (err) => {
        this.errors = err;

        console.log(this.errors);
      },
    });
  }
  get500Error() {
    this.http.get(`${this.baseUrl}/buggy/server-error`).subscribe({
      next: (req) => {},
      error: (err) => {
        this.errors = err;
      },
    });
  }
  get401Error() {
    this.http.get(`${this.baseUrl}/buggy/auth`).subscribe({
      next: (req) => {},
      error: (err) => {
        this.errors = err;
      },
    });
  }

  get400ValidationError() {
    this.http.post(`${this.baseUrl}/account/register`, {}).subscribe({
      next: (req) => {},
      error: (err) => {
        this.errors = err;
      },
    });
  }
}
