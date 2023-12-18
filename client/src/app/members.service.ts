import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from './../environments/environment';
import { Member } from './model/member';
import { map, of } from 'rxjs';
import { PaginationResult } from './model/pagination';
import { UserParams } from './model/userParams';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  http = inject(HttpClient);
  members: Member[] = [];

  getMembers(userParams: UserParams) {
    let params = this.getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender!);

    return this.getPaginatedResult<Member[]>(`${this.baseUrl}/users`, params);
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

  private getPaginatedResult<T>(url: string, params: HttpParams) {
    const paginatedResult: any = new PaginationResult<T[]>();
    return this.http.get<Member[]>(url, { observe: 'response', params }).pipe(
      map((response) => {
        paginatedResult.result = response.body!;
        console.log(paginatedResult.result);
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(
            response.headers.get('Pagination')!
          );
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }
}
