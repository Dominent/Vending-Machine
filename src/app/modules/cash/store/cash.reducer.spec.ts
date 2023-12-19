import { HttpErrorResponse } from '@angular/common/http';
import * as fromActions from './cash.actions';
import { cashReducer } from './cash.reducer';
import { cashInitialState } from './cash.state';

describe('CashReducer', () => {
  it('should return the default state', () => {
    const action = {} as any;
    const state = cashReducer(undefined, action);

    expect(state).toBe(cashInitialState);
  });

  it('should set loading to true on fetchDenominationsRequest', () => {
    const action = fromActions.fetchDenominationsRequest();
    const state = cashReducer(cashInitialState, action);

    expect(state.loading.fetchDenominations).toBe(true);
    expect(state.error.fetchDenominations).toBeNull();
  });

  it('should populate denominations and set loading to false on fetchDenominationsSuccess', () => {
    const denominations = [{ id: 1, denomination: 10, quantity: 5 }];
    const action = fromActions.fetchDenominationsSuccess({
      payload: { denominations },
    });
    const state = cashReducer(cashInitialState, action);

    expect(state.denominations).toEqual(denominations);
    expect(state.loading.fetchDenominations).toBe(false);
    expect(state.error.fetchDenominations).toBeNull();
  });

  it('should set error and loading to false on fetchDenominationsFailure', () => {
    const error = new HttpErrorResponse({ error: new Error('Error') });
    const action = fromActions.fetchDenominationsFailure({
      payload: { error },
    });
    const state = cashReducer(cashInitialState, action);

    expect(state.error.fetchDenominations).toEqual(error);
    expect(state.loading.fetchDenominations).toBe(false);
  });

  it('should add a denomination on insertDenomination', () => {
    const denomination = { id: 2, denomination: 20, quantity: 3 };
    const action = fromActions.insertDenomination({
      payload: { denomination },
    });
    const state = cashReducer(cashInitialState, action);

    expect(state.insertedDenominations).toContain(denomination);
  });

  it('should reset insertedDenominations on resetInsertedDenominations', () => {
    const action = fromActions.resetInsertedDenominations();
    const state = cashReducer(cashInitialState, action);

    expect(state.insertedDenominations).toEqual([]);
  });
});
