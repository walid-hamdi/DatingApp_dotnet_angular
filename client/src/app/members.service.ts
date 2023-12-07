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

  getMembers() {
    return this.http.get<Member[]>(`${this.baseUrl}/users`);
  }
  getMember(username: string) {
    return this.http.get<Member>(`${this.baseUrl}/users/${username}`);
  }

  updateMember(member: Member) {
    return this.http.put(`${this.baseUrl}/users`, member);
  }
}
