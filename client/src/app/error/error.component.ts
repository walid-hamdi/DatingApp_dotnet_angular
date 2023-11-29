import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
  baseUrl = 'https://localhost:5001/api';
  constructor(private http: HttpClient) {}

  get400Error() {
    this.http.get(`${this.baseUrl}/buggy/bad-request`).subscribe(
      (res) => console.log(res),
      (error) => console.log(error)
    );
  }
  get500Error() {
    this.http.get(`${this.baseUrl}/buggy/server-error`).subscribe(
      (res) => console.log(res),
      (error) => console.log(error)
    );
  }
  get401Error() {
    this.http.get(`${this.baseUrl}/buggy/auth`).subscribe(
      (res) => console.log(res),
      (error) => console.log(error)
    );
  }

  get400ValidationError() {
    this.http.post(`${this.baseUrl}/account/register`, {}).subscribe(
      (res) => console.log(res),
      (error) => console.log(error)
    );
  }
}
