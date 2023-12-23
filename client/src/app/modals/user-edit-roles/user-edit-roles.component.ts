import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-user-edit-roles',
  standalone: true,
  imports: [MatCheckboxModule, MatListModule, FormsModule, CommonModule],
  templateUrl: './user-edit-roles.component.html',
  styleUrl: './user-edit-roles.component.css',
})
export class UserEditRolesComponent {
  adminService = inject(AdminService);
  dialogRef = inject(MatDialogRef<UserEditRolesComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      username: string;
      roles: { name: string; isSelected: boolean }[];
    }
  ) {}

  onSave() {
    const selectedRoleNames = this.data.roles
      .filter((role) => role.isSelected)
      .map((role) => role.name);

    this.adminService
      .updateUserRoles(this.data.username, selectedRoleNames)
      .subscribe({
        next: () => {
          console.log('Roles updated successfully');
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Error updating roles:', error);
        },
      });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
