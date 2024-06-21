import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

//some of use to pass token or header to header in request
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const newHeaders = new HttpHeaders({
    'Content-Type': 'application.json',
  });
  const clone = req.clone({ headers: newHeaders });

  return next(clone);
};
