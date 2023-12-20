import { HttpClient, HttpParams } from '@angular/common/http';
import { Member } from '../model/member';
import { PaginationResult } from '../model/pagination';
import { map } from 'rxjs';

export function getPaginatedResult<T>(
  url: string,
  params: HttpParams,
  http: HttpClient
) {
  const paginatedResult: any = new PaginationResult<T[]>();
  return http.get<Member[]>(url, { observe: 'response', params }).pipe(
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

export function getPaginationHeaders(pageNumber: number, pageSize: number) {
  let params = new HttpParams();
  params = params.append('pageNumber', pageNumber.toString());
  params = params.append('pageSize', pageSize.toString());

  return params;
}
