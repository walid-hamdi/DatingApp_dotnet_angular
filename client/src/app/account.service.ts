import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ReplaySubject, map } from 'rxjs';
import { USER_KEY } from './model/constants';
import { User, UserLogin } from './model/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private currentUserSource = new ReplaySubject<User | null>(1);
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:5001/api';
  currentUser$ = this.currentUserSource.asObservable();

  login(model: UserLogin) {
    return this.http.post<User>(`${this.baseUrl}/account/login`, model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem(USER_KEY, JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: UserLogin) {
    return this.http.post<User>(`${this.baseUrl}/account/register`, model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem(USER_KEY, JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: User | null) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem(USER_KEY);
    this.currentUserSource.next(null);
  }
}
