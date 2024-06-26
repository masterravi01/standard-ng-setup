import { Component, OnInit, ViewChild } from '@angular/core';
import { APIConstant } from '../../../core/constants/APIConstant';
import { AuthService } from '../../../core/services/auth.service';
import { CrudService } from '../../../core/services/crud.service';
import { AlertModalComponent } from '../../../core/reused/alert-modal/alert-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  @ViewChild(AlertModalComponent) alertModal!: AlertModalComponent;
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
        this.alertModal.showMessage('success', 'Data loaded successfully!');
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }
}
