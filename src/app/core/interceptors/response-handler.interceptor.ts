import { HttpInterceptorFn } from '@angular/common/http';
//handle response & error from response
export const responseHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
