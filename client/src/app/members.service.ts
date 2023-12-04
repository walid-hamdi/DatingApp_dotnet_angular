import { Injectable, inject } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { USER_KEY } from './model/constants';
import { User } from './model/user';
import { Member } from './model/member';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  http = inject(HttpClient);
  httpOptions: any = null;

  constructor() {
    const user: User | null = JSON.parse(localStorage.getItem(USER_KEY) || '');
    if (user) {
      const token = user.token;

      this.httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };
    }
  }

  getMembers() {
    return this.http.get<Member[]>(`${this.baseUrl}/users`, this.httpOptions);
  }
  getMember(username: string) {
    return this.http.get<Member>(
      `${this.baseUrl}/users/${username}`,
      this.httpOptions
    );
  }
}
