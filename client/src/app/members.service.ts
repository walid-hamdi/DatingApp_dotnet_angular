import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from './../environments/environment';
import { Member } from './model/member';
import { map, of, take } from 'rxjs';
import { PaginationResult } from './model/pagination';
import { UserParams } from './model/userParams';
import { User } from './model/user';
import { AccountService } from './services/account.service';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  http = inject(HttpClient);
  accountService = inject(AccountService);
  user?: User;
  userParams?: UserParams;
  members: Member[] = [];
  memberCache = new Map();

  constructor() {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user!;
      this.userParams = new UserParams(user!);
    });
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(userParams: UserParams) {
    this.userParams = userParams;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user!);
    return this.userParams;
  }

  getMembers(userParams: UserParams) {
    let response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) return of(response);

    let params = this.getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender!);
    params = params.append('orderBy', userParams.orderBy!);

    return this.getPaginatedResult<Member[]>(
      `${this.baseUrl}/users`,
      params
    ).pipe(
      map((response) => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }

  getMember(username: string) {
    const member = [...this.memberCache.values()]
      .reduce((arr, element) => arr.concat(element.result), [])
      .find((member: Member) => member.username === username);

    if (member) return of(member);

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
