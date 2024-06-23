import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './crud.service';
import { APIConstant } from '../constants/APIConstant';
import { Router } from '@angular/router';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private crudService: CrudService,
    private router: Router,
    private userInfoService: UserInfoService
  ) {}

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

  async refreshToken(): Promise<void> {
    this.crudService
      .post(APIConstant.REFRESH_TOKEN)
      .then((response: any) => {
        console.log(response);
        this.userInfoService.setUserInfo(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
        this.logout();
      });
  }

  async login(credentials: any): Promise<void> {
    try {
      this.crudService
        .post(APIConstant.LOGIN.LOGIN, credentials)
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

  clearLocalStorageAndRedirect(): void {
    this.userInfoService.clearUserInfo();
    this.router.navigate(['/login']);
  }
}
