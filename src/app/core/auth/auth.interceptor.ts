import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { tap, catchError, take, filter, switchMap } from 'rxjs/operators';
import { empty, throwError, Subject } from 'rxjs';

import { TokenService } from './token.service';
import { AuthService } from '@app/core/auth/auth.service';

const PATH_LOGIN = 'login';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private refreshTokenInProgress = false;
  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  // Contains the current refresh token or is null if
  // the refresh is pending and no refresh token is currently available
  private refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    null
  );

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isSecuredUrl(request)) {
      return this.handleRequest(request, next);
    } else {
      return next.handle(request);
    }
  }

  private handleRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addAccessToken(request);
    return next.handle(request)
      .pipe(
        tap((response: HttpEvent<any>) => {
          if (response instanceof HttpResponse) {
          }
        }),
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              console.log('The response returned a 401 error');
              if (this.authService.isLoginRequest(request)) {
                return throwError(error);
              } else if (this.authService.isRefreshTokenRequest(request)) {
                this.logout();
                return throwError(error);
              } else {
                if (this.authService.rememberMe()) {
                  console.log('Remember me...');
                  return this.refreshToken()
                    .pipe(
                      switchMap(() => {
                        request = this.addAccessToken(request);
                        return next.handle(request);
                      })
                    )
                    .pipe(
                      catchError(
                        (refreshError) => {
                          this.logout();
                          return throwError(refreshError);
                        })
                    );
                }
              }
            } else if (error.status === 498) {
              // The token expired
              this.logout();
            }
            console.log('The response returned the error with the status ' + error.status + ' ' + error.statusText);
          }
          return throwError(error);
        }) as any
      );
  }

  private addAccessToken(request): HttpRequest<any> {
    if (!this.tokenService.getAccessTokenFromLocalStorage()) {
      return request;
    }

    // The original request is immutable and cannot be changed
    return this.authService.addAccessTokenToClonedRequest(request);
  }

  private refreshToken() {
    if (this.refreshTokenInProgress) {
      return new Observable(observer => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;
      console.log('Sending a refresh token request...');
      return this.authService.refreshAccessToken()
        .pipe(
          tap(() => {
            console.log('The access token has been refreshed by the interceptor');
            this.refreshTokenInProgress = false;
            this.tokenRefreshedSource.next();
          })
        );
    }
  }

  private logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}