/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

// eslint-disable-next-line @typescript-eslint/ban-types
export const userDetailsResolver: ResolveFn<Object> = (
  route: ActivatedRouteSnapshot,
  state
) => {
  return inject(AuthService).getUserProfile();
};
