import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../model/user';
import { AdminService } from '../../services/admin.service';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UserEditRolesComponent } from '../../modals/user-edit-roles/user-edit-roles.component';

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
  dialog = inject(MatDialog);

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

  editUser(user: User) {
    const dialogRef = this.dialog.open(UserEditRolesComponent, {
      data: {
        username: user.username,
        roles: user.roles.map((role) => ({ name: role, isSelected: false })),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
