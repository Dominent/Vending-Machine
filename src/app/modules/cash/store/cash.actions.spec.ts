import { HttpErrorResponse } from '@angular/common/http';
import { IDenomination } from '../models/cash.models';
import * as fromActions from './cash.actions';

describe('Cash Actions', () => {
  describe('fetchDenominationsRequest Action', () => {
    it('should create the action', () => {
      const action = fromActions.fetchDenominationsRequest();
      expect({ ...action }).toEqual({
        type: '[CASH]FETCH_DENOMINATIONS_REQUEST',
      });
    });
  });

  describe('fetchDenominationsSuccess Action', () => {
    it('should create the action with payload', () => {
      const payload = {
        denominations: [
          { id: 1, denomination: 100, quantity: 5 },
        ] as IDenomination[],
      };
      const action = fromActions.fetchDenominationsSuccess({ payload });
      expect({ ...action }).toEqual({
        type: '[CASH]FETCH_DENOMINATIONS_SUCCESS',
        payload,
      });
    });
  });

  describe('fetchDenominationsFailure Action', () => {
    it('should create the action with error payload', () => {
      const error: HttpErrorResponse = new HttpErrorResponse({
        error: 'Error occurred',
      });
      const payload = { error };
      const action = fromActions.fetchDenominationsFailure({ payload });
      expect({ ...action }).toEqual({
        type: '[CASH]FETCH_DENOMINATIONS_FAILURE',
        payload,
      });
    });
  });

  describe('insertDenomination Action', () => {
    it('should create the action with payload', () => {
      const payload = {
        denomination: {
          id: 2,
          denomination: 50,
          quantity: 10,
        } as IDenomination,
      };
      const action = fromActions.insertDenomination({ payload });
      expect({ ...action }).toEqual({
        type: '[CASH]INSERT_DENOMINATION',
        payload,
      });
    });
  });

  describe('resetInsertedDenominations Action', () => {
    it('should create the action', () => {
      const action = fromActions.resetInsertedDenominations();
      expect({ ...action }).toEqual({
        type: '[CASH]RESET_INSERTED_DENOMINATIONS',
      });
    });
  });
});
