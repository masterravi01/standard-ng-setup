import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CrudService } from '../../core/services/crud.service';
import { APIConstant } from '../../core/constants/APIConstant';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css',
})
export class ForgotpasswordComponent implements OnInit {
  userInfo: any;
  constructor(
    private authService: AuthService,
    private crudService: CrudService
  ) {}
  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
    console.log(this.userInfo);
    this.crudService
      .post(APIConstant.GET_USER)
      .then((response: any) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }
}
