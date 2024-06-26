import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import {
  catchError,
  switchMap,
  throwError,
  filter,
  take,
  finalize,
} from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { from } from 'rxjs';
import { LoaderService } from '../services/loader.service';

//handle response & error from response
export const responseHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const loaderService = inject(LoaderService);
  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        return authService.tokenRefreshInProgress.pipe(
          filter((inProgress) => !inProgress),
          take(1),
          switchMap(() => {
            authService.tokenRefreshInProgressSubject.next(true);
            return from(authService.refreshToken()).pipe(
              switchMap(() => {
                const newAuthReq = req.clone({
                  withCredentials: true,
                });
                loaderService.hide();
                return next(newAuthReq);
              }),
              catchError((refreshErr) => {
                console.error('Error refreshing token:', refreshErr);
                authService.clearLocalStorageAndRedirect();
                loaderService.hide();
                return throwError(() => refreshErr);
              }),
              finalize(() => {
                loaderService.hide();
                authService.tokenRefreshInProgressSubject.next(false);
              })
            );
          })
        );
      } else {
        loaderService.hide();
        console.error('HTTP error:', err);
        return throwError(() => err);
      }
    }),
    finalize(() => {
      loaderService.hide();
      authService.tokenRefreshInProgressSubject.next(false);
    })
  );
};
