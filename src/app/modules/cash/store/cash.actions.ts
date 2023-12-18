import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IDenomination } from '../models/cash.models';

export const fetchDenominationsRequest = createAction(
  '[CASH]FETCH_DENOMINATIONS_REQUEST'
);
export const fetchDenominationsSuccess = createAction(
  '[CASH]FETCH_DENOMINATIONS_SUCCESS',
  props<{ payload: { denominations: IDenomination[] } }>()
);
export const fetchDenominationsFailure = createAction(
  '[CASH]FETCH_DENOMINATIONS_FAILURE',
  props<{ payload: { error: HttpErrorResponse } }>()
);

export const insertDenomination = createAction(
  '[CASH]INSERT_DENOMINATION',
  props<{ payload: { denomination: IDenomination } }>()
);

export const resetInsertedDenominations = createAction(
  '[CASH]RESET_INSERTED_DENOMINATIONS'
);
