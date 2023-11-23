import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, map } from 'rxjs';
import { USER_KEY } from './model/constants';
import { User, UserLogin } from './model/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  baseUrl = 'https://localhost:5001/api';
  constructor(private http: HttpClient) {}

  login(model: UserLogin) {
    return this.http.post<User>(`${this.baseUrl}/account/login`, model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem(USER_KEY, JSON.stringify(user));
          this.currentUserSource.next(user)
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
