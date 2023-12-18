import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IDenomination } from '../models/cash.models';
import * as fromActions from './cash.actions';
import * as fromSelectors from './cash.selectors';

@Injectable({
  providedIn: 'root',
})
export class CashStoreFacadeService {
  public constructor(private readonly _store: Store<{}>) {}

  public get actions() {
    return {
      fetchDenominations: () =>
        this._store.dispatch(fromActions.fetchDenominationsRequest()),
      insertDenomination: (denomination: IDenomination) =>
        this._store.dispatch(
          fromActions.insertDenomination({ payload: { denomination } })
        ),
      resetDenomination: () =>
        this._store.dispatch(fromActions.resetInsertedDenominations()),
    };
  }

  public get state() {
    return {
      denominations$: this._store.select(fromSelectors.selectDenominations),
      insertedDenominations$: this._store.select(
        fromSelectors.selectInsertedDenominations
      ),
      totalInsertedCash$: this._store.select(
        fromSelectors.selectTotalInsertedCash
      ),
    };
  }

  public get error() {
    return {};
  }

  public get loading() {
    return {};
  }
}
