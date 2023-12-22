import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../model/user';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.apiUrl;
  http = inject(HttpClient);

  getUserWithRoles(): Observable<Partial<User[]>> {
    return this.http.get<Partial<User[]>>(
      `${this.baseUrl}/admin/users-with-roles`
    );
  }

  updateUserRoles(username: string, roles: string[]) {
    return this.http.post(
      `${this.baseUrl}/admin/edit-roles/${username}?roles=${roles}`,
      {}
    );
  }
}
