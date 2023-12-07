import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyService } from '../services/busy.service';
import { catchError, delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);

  busyService.busy();

  return next(req).pipe(
    delay(2000),
    finalize(() => {
      busyService.idle();
    }),
    catchError((error) => {
      busyService.idle(); // Ensure that the spinner is hidden in case of an error
      throw error;
    })
  );
};
