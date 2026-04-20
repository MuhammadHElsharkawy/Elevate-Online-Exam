import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const _platformid = inject(PLATFORM_ID);

  if (isPlatformBrowser(_platformid)) {
    const token = localStorage.getItem('ExamAppToken');
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  return next(req).pipe(
    catchError((err) => {
      console.log('Interceptor Error:', err);
      return throwError(() => err);
    })
  );

  return next(req);
};
