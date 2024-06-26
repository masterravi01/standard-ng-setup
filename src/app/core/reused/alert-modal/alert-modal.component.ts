import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [NgbAlertModule, CommonModule],
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css'],
})
export class AlertModalComponent {
  private _message$ = new Subject<{ type: string; text: string }>();

  message = { type: '', text: '' };
  constructor() {
    this._message$.pipe(tap((message) => (this.message = message))).subscribe();
  }

  public showMessage(type: 'success' | 'error', text: string) {
    this._message$.next({ type, text });
  }
}
