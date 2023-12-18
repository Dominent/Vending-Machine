import { Component, Input, OnInit } from '@angular/core';
import { IDenomination } from '../../models/cash.models';
import { CashStoreFacadeService } from '../../store/cash-store-facade.service';

@Component({
  selector: 'app-cash-insertion',
  templateUrl: './cash-insertion.component.html',
  styleUrls: ['./cash-insertion.component.scss'],
  host: { class: 'mat-elevation-z8' },
})
export class CashInsertionComponent implements OnInit {
  @Input()
  public denominations: IDenomination[] | null | undefined;

  constructor(private _cashStoreFacadeService: CashStoreFacadeService) {}

  ngOnInit() {}

  handleDenominationClick(denomination: IDenomination) {
    this._cashStoreFacadeService.actions.insertDenomination(denomination);
  }
}
