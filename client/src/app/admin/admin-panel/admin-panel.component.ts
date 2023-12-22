import { Component } from '@angular/core';
import { UserManagementComponent } from '../user-management/user-management.component';
import { PhotoManagementComponent } from '../photo-management/photo-management.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HasRoleDirective } from '../../directives/has-role.directive';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    UserManagementComponent,
    PhotoManagementComponent,
    MatTabsModule,
    HasRoleDirective,
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent {}
