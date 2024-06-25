import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

// eslint-disable-next-line @typescript-eslint/ban-types
export const userDetailsResolver: ResolveFn<Object> = (route: ActivatedRouteSnapshot, state) => {
  return inject(AuthService).getUserInfo();
};
