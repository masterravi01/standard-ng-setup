import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
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

export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);

  const authReq = req.clone({
    withCredentials: true,
  });

  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        return authService.tokenRefreshInProgress.pipe(
          filter((inProgress) => !inProgress),
          take(1),
          switchMap(() => {
            return from(authService.refreshToken()).pipe(
              switchMap(() => {
                const newAuthReq = req.clone({
                  withCredentials: true,
                });
                return next(newAuthReq);
              }),
              catchError((refreshErr) => {
                console.error('Error refreshing token:', refreshErr);
                authService.clearLocalStorageAndRedirect();
                return throwError(() => refreshErr);
              }),
              finalize(() => {
                authService.tokenRefreshInProgressSubject.next(false);
              })
            );
          })
        );
      } else {
        console.error('HTTP error:', err);
        return throwError(() => err);
      }
    })
  );
};
