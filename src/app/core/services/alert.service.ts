import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AlertMessage {
  type: 'success' | 'danger' | 'info' | 'warning' | 'primary';
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new BehaviorSubject<AlertMessage | null>(null);
  alertState$ = this.alertSubject.asObservable();
  alertVisible = false;

  customAlert(
    type: 'success' | 'danger' | 'info' | 'warning' | 'primary',
    message: string
  ): void {
    this.alertSubject.next({ type, message });
    this.alertVisible = true;
    setTimeout(() => this.clearAlert(), 20000); // Auto-hide after 20 seconds
  }
  successAlert(message: string): void {
    const type = 'success';
    this.alertSubject.next({ type, message });
    this.alertVisible = true;
    setTimeout(() => this.clearAlert(), 20000);
  }
  errorAlert(message: string): void {
    const type = 'danger';
    this.alertSubject.next({ type, message });
    this.alertVisible = true;
    setTimeout(() => this.clearAlert(), 20000);
  }
  clearAlert(): void {
    this.alertSubject.next(null); // Use null to clear the alert
    this.alertVisible = false;
  }
}
