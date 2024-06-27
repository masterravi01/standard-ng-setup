import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { MasterService } from './master.service';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private masterService: MasterService) {}

  async get(endpoint: string, params?: any): Promise<any> {
    return lastValueFrom(
      this.masterService.Get(`${environment.url}` + endpoint, params)
    );
  }

  async post(endpoint: string, body?: any, params?: any): Promise<any> {
    return lastValueFrom(
      this.masterService.Post(`${environment.url}` + endpoint, body, params)
    );
  }

  async put(endpoint: string, body: any): Promise<any> {
    return lastValueFrom(
      this.masterService.Put(`${environment.url}` + endpoint, body)
    );
  }

  async delete(endpoint: string, body?: any, params?: any): Promise<any> {
    return lastValueFrom(
      this.masterService.Delete(`${environment.url}` + endpoint, body, params)
    );
  }
}
