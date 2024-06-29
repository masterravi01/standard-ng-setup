/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ValueGetterParams,
  ICellRendererParams,
} from 'ag-grid-community';
import { AgGridAngular, ICellRendererAngularComp } from 'ag-grid-angular';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

@Component({
  standalone: true,
  template: `<button (click)="buttonClicked()">Push Me!</button>`,
})
export class CustomButtonComponent implements ICellRendererAngularComp {
  agInit(params: ICellRendererParams): void {}
  refresh(params: ICellRendererParams) {
    return true;
  }
  buttonClicked() {
    alert('clicked');
  }
}

@Component({
  selector: 'app-ag-grid-use',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './ag-grid-use.component.html',
  styleUrls: ['./ag-grid-use.component.css'],
})
export class AgGridUseComponent implements OnInit {
  private gridApi!: GridApi<any>;

  userList: any[] = [];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  colDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'User Id',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      cellRenderer: (item: any) => {
        return 'EMP-' + item.value;
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      filter: 'agTextColumnFilter',
      valueGetter: (p: ValueGetterParams) =>
        p.data.name + ' ' + p.data.username,
    },
    {
      field: 'username',
      headerName: 'User Name',
      valueFormatter: (p) => '$-' + p.value.toLocaleString(),
    },
    { field: 'email', headerName: 'E-mail', editable: true },
    { field: 'button', cellRenderer: CustomButtonComponent, flex: 1 },
  ];

  defaultColDef = {
    flex: 1,
    minWdith: 100,
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUser();
  }
  onGridReady(event: GridReadyEvent<any>) {
    this.gridApi = event.api;
  }

  onBtExport() {
    this.gridApi.exportDataAsCsv();
  }

  getUser() {
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe((res: any) => {
        this.userList = res;
      });
  }
}
