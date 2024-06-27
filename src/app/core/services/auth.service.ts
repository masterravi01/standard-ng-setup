import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { APIConstant } from '../constants/APIConstant';
import { Router } from '@angular/router';
import { UserInfoService } from './user-info.service';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public tokenRefreshInProgressSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private crudService: CrudService,
    private router: Router,
    private userInfoService: UserInfoService
  ) {}

  get tokenRefreshInProgress(): Observable<boolean> {
    return this.tokenRefreshInProgressSubject.asObservable();
  }

  async logout(redirectTo: boolean = true): Promise<void> {
    this.crudService
      .post(APIConstant.LOGOUT)
      .then((response: any) => {
        console.log(response);
        this.userInfoService.clearUserInfo();
        if (redirectTo) {
          this.router.navigate(['/login']);
        }
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }

  isAuthenticated(): boolean {
    return this.userInfoService.getUserInfo() !== null;
  }

  refreshToken(): Observable<any> {
    this.tokenRefreshInProgressSubject.next(true);
    return from(this.crudService.post(APIConstant.REFRESH_TOKEN)).pipe(
      tap((response: any) => {
        console.log(response);
        this.userInfoService.setUserInfo(response.data);
      }),
      catchError((error) => {
        console.error('Error refreshing token:', error);
        return throwError(() => error);
      }),
      finalize(() => {
        this.tokenRefreshInProgressSubject.next(false);
      })
    );
  }

  async login(credentials: any): Promise<void> {
    try {
      this.crudService
        .post(APIConstant.LOGIN, credentials)
        .then((response: any) => {
          console.log(response);
          this.userInfoService.setUserInfo(response.data);
          this.router.navigate(['/dashboard']);
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  getUserInfo(): any {
    return this.userInfoService.getUserInfo();
  }

  async getUserProfile(): Promise<any> {
    return this.crudService
      .post(APIConstant.GET_USER)
      .then((response: any) => {
        console.log(response);
        return response;
      })
      .catch((error: any) => {
        console.error('There was an error!', error);
        throw error;
      });
  }

  clearLocalStorageAndRedirect(): void {
    this.userInfoService.clearUserInfo();
    this.router.navigate(['/login']);
  }
}
