import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

import { AuthenticationService } from '../_services';
import { User } from '../_models';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private _auth: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status) && this._auth.userValue) {
                // auto logout if 401 or 403 response returned from api
                console.log([401, 403]);

                return next.handle(request)
                    .pipe(
                        catchError(error => {
                            if (error instanceof HttpErrorResponse && error.status === 401) {
                                return this.handle401Error(request, next);
                            } else {
                                return throwError(error);
                            }
                        })
                    );
            }

            const error = (err && err.error && err.error.message) || err.statusText;
            console.error(err);
            return throwError(error);
        }))
    }


    private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this._auth.refreshToken().pipe(
                switchMap((user: User) => {
                    console.log(user);
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(user.access_token);
                    return next.handle(
                        request.clone({
                            setHeaders: {
                                'Authorization': `Bearer ${user.access_token}`
                            }
                        })
                    );
                }));

        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(jwt => {
                    return next.handle(
                        request.clone({
                            setHeaders: {
                                'Authorization': `Bearer ${jwt}`
                            }
                        })
                    );
                }));
        }
    }
}