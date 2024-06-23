import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
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
        // Refresh token if a 403 Forbidden error is encountered
        return from(authService.refreshToken()).pipe(
          switchMap(() => {
            // Clone the original request and retry it
            const newAuthReq = req.clone({
              withCredentials: true,
            });
            return next(newAuthReq);
          }),
          catchError((refreshErr) => {
            // Handle errors in the token refresh process
            console.error('Error refreshing token:', refreshErr);
            authService.clearLocalStorageAndRedirect();
            return throwError(() => refreshErr);
          })
        );
      } else {
        // Handle other errors
        console.error('HTTP error:', err);
        return throwError(() => err);
      }
    })
  );
};
