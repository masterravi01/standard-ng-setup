import { Injectable } from '@angular/core';
import { MasterService } from './master.service';
import { environment } from '../../../environments/environment.development';
import { APIConstant } from '../constants/APIConstant';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private master: MasterService) {}

  getAllUsers() {
    this.master.Get(environment.url + APIConstant.GET_ALL_EMPLOYEE);
  }
}
