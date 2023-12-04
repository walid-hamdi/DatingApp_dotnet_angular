import { Injectable, inject } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { USER_KEY } from './model/constants';
import { User } from './model/user';

const user = JSON.parse(localStorage.getItem(USER_KEY) ?? '');
let httpOptions: any = null;
if (user) {
  const token = (user as User).token;

  console.log(token);

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`,
    }),
  };
}

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  http = inject(HttpClient);

  constructor() {}

  getMembers() {
    return this.http.get<Member[]>(`${this.baseUrl}/users`, httpOptions);
  }
  getMember(username: string) {
    return this.http.get<Member>(
      `${this.baseUrl}/users/${username}`,
      httpOptions
    );
  }
}
