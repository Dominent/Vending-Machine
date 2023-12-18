import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDenomination } from '../../models/cash.models';

@Component({
  selector: 'app-cash-insertion-item',
  templateUrl: './cash-insertion-item.component.html',
  styleUrls: ['./cash-insertion-item.component.scss'],
  host: { class: 'mat-elevation-z8' },
})
export class CashInsertionItemComponent implements OnInit {
  @Input()
  public denomination: IDenomination | undefined;

  @Output()
  public onClick: EventEmitter<IDenomination> =
    new EventEmitter<IDenomination>();

  constructor() {}

  ngOnInit() {}

  handleClick() {
    this.onClick.emit(this.denomination);
  }
}
