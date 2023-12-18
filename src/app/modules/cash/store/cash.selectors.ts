import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICashState, cashStateFeatureKey } from './cash.state';

const selectCashState = createFeatureSelector<ICashState>(cashStateFeatureKey);

export const selectDenominations = createSelector(
  selectCashState,
  (state) => state.denominations
);

export const selectInsertedDenominations = createSelector(
  selectCashState,
  (state) => state.insertedDenominations
);

export const selectTotalInsertedCash = createSelector(
  selectCashState,
  (state) =>
    state.insertedDenominations?.reduce(
      (acc, { denomination }) => acc + denomination,
      0
    )
);
