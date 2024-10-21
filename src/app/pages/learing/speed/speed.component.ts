import { Component, OnDestroy, OnInit } from '@angular/core';
import { CrudService } from '../../../core/services/crud.service';
import { APIConstant } from '../../../core/constants/APIConstant';
import { User } from '../../../core/models/classes/user.class';
import { Observable, of, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-speed',
  templateUrl: './speed.component.html',
  styleUrl: './speed.component.css',
})
export class SpeedComponent implements OnInit, OnDestroy {
  userInfo: User = new User();
  alertMsg = '';
  showAlert: boolean = false;
  mySubscription: Subscription[] = [];

  $myUser: Observable<{
    statusCode: number;
    data: User;
    message: string;
  }> = of({
    statusCode: 200,
    data: new User(),
    message: '',
  });

  constructor(
    private crudService: CrudService,
    public httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this.$myUser = this.httpClient.post<{
      statusCode: number;
      data: User;
      message: string;
    }>('http://localhost:4201/hotelpro/user/current-user', {});
    this.crudService
      .post(APIConstant.API_TEST)
      .then((response: any) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }
  // step to increase speed
  // 1. loader in table by using single variable like isloading true false
  // 2. for call api rather showing all loading we can show loader in button show user do not call more time that api
  // 3. use alert for confirmation (bootstrap aler)
  //4. if by default all variable are public , if use declare private varibale it will not accessable to html , it is only accessable in ts
  //5. classes always use for like if want bind to form , interface use for if you only want hold data
  //6. subscribe & unsubscribe
  //when we do subscribe it will do your memory open so i will always consume your memory , because it is contanstly subscriebing to that property & check ing that for updaTE or not
  // so memory leake happen,so it will slow down your app,so we unsubscribe api which we are call when we change route
  //7. async pipe , when use : like example if want show dashboard data here you are not changeing that data & it will only refresh when you are reload or load page at that time yoy should use this. use this with interface
  callApi() {
    this.crudService
      .get(APIConstant.GET_USER)
      .then((response: any) => {
        console.log(response);
        this.userInfo = response.data;
        this.showAlert = true;
        this.alertMsg = 'alert is display Successfully!!!';
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
    this.httpapi();
  }
  httpapi() {
    const a = this.httpClient
      .post('http://localhost:4201/hotelpro/admin/apiTest', {})
      .subscribe((res: any) => {
        console.log(res);
      });
    this.mySubscription.push(a);
  }
  ngOnDestroy(): void {
    // eslint-disable-next-line no-debugger
    debugger;
    this.mySubscription.forEach((e) => {
      e.unsubscribe();
    });
  }
}
