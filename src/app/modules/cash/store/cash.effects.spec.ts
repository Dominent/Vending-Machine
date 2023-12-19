import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { CashService } from '../services/cash.service';
import * as fromActions from './cash.actions';
import { CashEffects } from './cash.effects';

describe('CashEffects', () => {
  let effects: CashEffects;
  let actions$: Observable<any>;
  let cashService: jasmine.SpyObj<CashService>;

  beforeEach(() => {
    const cashServiceSpy = jasmine.createSpyObj('CashService', [
      'fetchDenominations',
    ]);

    TestBed.configureTestingModule({
      providers: [
        CashEffects,
        provideMockActions(() => actions$),
        { provide: CashService, useValue: cashServiceSpy },
      ],
    });

    effects = TestBed.inject(CashEffects);
    cashService = TestBed.inject(CashService) as jasmine.SpyObj<CashService>;
  });

  it('should return a fetchDenominationsSuccess action, with denominations, on success', () => {
    const denominations = [{ id: 1, denomination: 10, quantity: 5 }];
    const action = fromActions.fetchDenominationsRequest();
    const completion = fromActions.fetchDenominationsSuccess({
      payload: { denominations },
    });

    actions$ = hot('-a', { a: action });
    const response = cold('-b|', { b: denominations });
    const expected = cold('--c', { c: completion });

    cashService.fetchDenominations.and.returnValue(response);

    expect(effects.fetchProductsEffect$).toBeObservable(expected);
  });

  it('should return a fetchDenominationsFailure action, with an error, on failure', () => {
    const error: HttpErrorResponse = new HttpErrorResponse({
      error: 'test error',
      status: 500,
    });
    const action = fromActions.fetchDenominationsRequest();
    const completion = fromActions.fetchDenominationsFailure({
      payload: { error },
    });

    actions$ = hot('-a', { a: action });
    const response = cold('-#', {}, error);
    const expected = cold('--c', { c: completion });

    cashService.fetchDenominations.and.returnValue(response);

    expect(effects.fetchProductsEffect$).toBeObservable(expected);
  });
});
