import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const excludedUrls = [
      '/api/Auth/forgot-password',
      '/api/Auth/reset-password'
    ];
    if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next.handle(cloned);
  }

  return next.handle(req);

    const isExcluded = excludedUrls.some(url => req.url.includes(url));

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Se è un 401 e NON è una rotta esclusa
        if (error.status === 401 && !isExcluded) {
          alert('You must be logged in to perform this action.');
          this.router.navigate(['/login']);
        }

        return throwError(() => error);
      })
    );
  }
}
