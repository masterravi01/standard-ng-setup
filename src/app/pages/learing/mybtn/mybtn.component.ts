import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-mybtn',
  templateUrl: './mybtn.component.html',
  styleUrl: './mybtn.component.css',
})
export class MybtnComponent {
  @Input() btnClass: string = '';
  @Input() text: string = '';

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onBtnClick = new EventEmitter<any>();

  onClick() {
    this.onBtnClick.emit();
  }
}
