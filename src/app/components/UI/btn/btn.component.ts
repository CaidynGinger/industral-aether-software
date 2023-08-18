import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss'],
})
export class BtnComponent {
  public buttonText = '';
  @Input()
  set text(name: string) {
    this.buttonText = name.toUpperCase();
  }
  get name(): string {
    return this.buttonText;
  }

  @Input() color: string = '0068B4';
  @Input() type: string = 'button';

  @Output() btnClick = new EventEmitter();
  @Input() isDisabled = false;
  onClick() {
    this.btnClick.emit();
  }
}
