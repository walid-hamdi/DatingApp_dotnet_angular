import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  const router = inject(Router);

  const openErrorToast = (message: string) => {
    snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['error-toast'],
    });
  };
  console.log('interceptor working...');

  return next(req).pipe(
    catchError((err) => {
      if (err)
        switch (err.statusCode) {
          case 400:
            console.log('400 error');
            if (err.error.errors) {
              const modalStateErrors = [];
              for (const key in err.error.errors) {
                if (err.error.errors[key]) {
                  modalStateErrors.push(err.error.errors[key]);
                }
              }
              throw modalStateErrors.flat();
            } else {
              openErrorToast(err.statusCode + ' ' + err.status);
            }
            break;
          case 401:
            console.log('401 error');
            openErrorToast(err.statusCode + ' ' + err.status);
            break;
          case 404:
            console.log('404 error');
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationExtras: NavigationExtras = {
              state: { error: err.error },
            };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            console.log('another error');
            openErrorToast('Something unexpected went wrong.');
            break;
        }
      return throwError(() => err);
    })
  );
};
