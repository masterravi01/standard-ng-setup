import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const loaderService = inject(LoaderService);
  const authReq = req.clone({
    withCredentials: true,
  });
  loaderService.show();
  return next(authReq);
};
