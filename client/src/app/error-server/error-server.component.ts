import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-server',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-server.component.html',
  styleUrl: './error-server.component.css',
})
export class ErrorServerComponent {
  error: any;
  router = inject(Router);

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state!['error'];
  }
}
