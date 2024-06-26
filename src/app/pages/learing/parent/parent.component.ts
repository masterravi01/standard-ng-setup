import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css',
})
export class ParentComponent implements OnInit {
  isLoading = true;
  smpdata = {
    id: 1,
    name: 'rsp',
  };
  ngOnInit(): void {
    setTimeout(() => {
      this, (this.isLoading = false);
    }, 2000);
  }
  getData(param: any) {
    console.log(param);
  }
}
