import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, ReplaySubject, map } from 'rxjs';
import { USER_KEY } from '../model/constants';
import { User, UserLogin } from '../model/user';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private currentUserSource = new ReplaySubject<User | null>(1);
  private http = inject(HttpClient);
  private presence = inject(PresenceService);
  private baseUrl = 'https://localhost:5001/api';
  currentUser$: Observable<User | null> = this.currentUserSource.asObservable();

  login(model: UserLogin) {
    return this.http.post<User>(`${this.baseUrl}/account/login`, model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
          this.presence.createHubConnection(user);
        }
      })
    );
  }

  register(model: UserLogin) {
    return this.http.post<User>(`${this.baseUrl}/account/register`, model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
          this.presence.createHubConnection(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user!.token).role;
    if (Array.isArray(roles)) {
      user!.roles = roles;
    } else {
      user!.roles.push(roles);
    }
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem(USER_KEY);
    this.currentUserSource.next(null);
    this.presence.stopConnection();
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
