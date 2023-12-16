import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from './../environments/environment';
import { Member } from './model/member';
import { map, of } from 'rxjs';
import { PaginationResult } from './model/pagination';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  http = inject(HttpClient);
  members: Member[] = [];
  paginatedResult: PaginationResult<Member[]> = new PaginationResult<
    Member[]
  >();

  getMembers(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== itemsPerPage) {
      params = params.append('pageNumber', page?.toString()!);
      params = params.append('pageSize', itemsPerPage?.toString()!);
    }
    return this.http
      .get<Member[]>(`${this.baseUrl}/users`, { observe: 'response', params })
      .pipe(
        map((response) => {
          this.paginatedResult.result = response.body!;
          if (response.headers.get('Pagination') !== null) {
            this.paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')!
            );
          }
          return this.paginatedResult;
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
