import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appMytooltip]',
})
export class MytooltipDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('appTooltip') toolTipContent: string = '';

  private toolTip: HTMLElement | null = null;

  constructor(private el: ElementRef, private render: Renderer2) {}

  createToolTip(): HTMLElement {
    const toolTip = this.render.createElement('div');
    const text = this.render.createText(this.toolTipContent);
    this.render.appendChild(toolTip, text);
    this.render.addClass(toolTip, 'mycls');
    this.render.setStyle(toolTip, 'position', 'absolute');
    this.render.setStyle(
      toolTip,
      'top',
      `${this.el.nativeElement.offsetTop + 20}px`
    );
    this.render.setStyle(
      toolTip,
      'left',
      `${this.el.nativeElement.offsetLeft}px`
    );
    return toolTip;
  }

  @HostListener('mouseover')
  onMouseOver() {
    if (this.toolTip) {
      this.render.removeChild(this.el.nativeElement, this.toolTip);
    }
    this.toolTip = this.createToolTip();
    this.render.appendChild(this.el.nativeElement, this.toolTip);
  }

  @HostListener('mouseout')
  onMouseOut() {
    if (this.toolTip) {
      this.render.removeChild(this.el.nativeElement, this.toolTip);
      this.toolTip = null;
    }
  }
}
