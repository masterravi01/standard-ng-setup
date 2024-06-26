// services/crud.service.ts
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { MasterService } from './master.service';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private masterService: MasterService) {}

  get(endpoint: string, params?: any) {
    return lastValueFrom(
      this.masterService.Get(`${environment.url}` + endpoint, params)
    );
  }

  post(endpoint: string, body?: any, params?: any) {
    return lastValueFrom(
      this.masterService.Post(`${environment.url}` + endpoint, body, params)
    );
  }

  put(endpoint: string, body: any) {
    return lastValueFrom(
      this.masterService.Put(`${environment.url}` + endpoint, body)
    );
  }

  delete(endpoint: string, body?: any, params?: any) {
    return lastValueFrom(
      this.masterService.Delete(`${environment.url}` + endpoint, body, params)
    );
  }
}
