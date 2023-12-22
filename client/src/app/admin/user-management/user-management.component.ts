import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../model/user';
import { AdminService } from '../../services/admin.service';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [MatInputModule, MatTableModule, MatButtonModule, CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {
  users?: Partial<User[]>;
  adminService = inject(AdminService);

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService
      ?.getUserWithRoles()
      .subscribe((users: Partial<User[]>) => {
        this.users = users;
      });
  }

  editUser(user: User) {}
}
