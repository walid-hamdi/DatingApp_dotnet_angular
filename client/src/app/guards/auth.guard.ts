import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { AccountService } from '../account.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private permissions: Permissions,
    private accountService: AccountService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.accountService.currentUser$.pipe(
      map((user) => {
        if (user) return true;
        else return false;
      })
    );
  }
}
