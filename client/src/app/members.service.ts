import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from './../environments/environment';
import { Member } from './model/member';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  http = inject(HttpClient);
  members: Member[] = [];

  getMembers() {
    if (this.members!.length > 0) return of(this.members);
    return this.http.get<Member[]>(`${this.baseUrl}/users`).pipe(
      map((members) => {
        this.members = members;
        return members;
      })
    );
  }
  getMember(username: string) {
    const member = this.members?.find((member) => member.username === username);
    if (member !== undefined) return of(member);
    return this.http.get<Member>(`${this.baseUrl}/users/${username}`);
  }

  updateMember(member: Member) {
    return this.http.put(`${this.baseUrl}/users`, member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }
}
