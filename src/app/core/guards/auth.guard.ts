import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuth = authService.isAuthenticated() as boolean;
  const isLoginRoute = state.url === '/login';
  if (isAuth && isLoginRoute) {
    router.navigate(['/forgot']);
    return false;
  }

  if (!isAuth && !isLoginRoute) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
