import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  return accountService.currentUser$.pipe(
    map((user) => {
      if (user) {
        if (
          user?.roles?.includes('Admin') ||
          user?.roles?.includes('Moderator')
        )
          return true;
        else return false;
      } else return false;
    })
  );
};
