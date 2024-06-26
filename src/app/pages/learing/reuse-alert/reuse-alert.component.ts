import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-reuse-alert',
  templateUrl: './reuse-alert.component.html',
  styleUrl: './reuse-alert.component.css',
})
export class ReuseAlertComponent implements OnChanges {
  @Input() isAlertVisable: boolean = false;
  @Input() AlertMsg: string = '';
  showAlert: boolean = false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ngOnChanges(changes: SimpleChanges): void {
    if (this.isAlertVisable) {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 2000);
    }
  }
}
