import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CashService } from '../services/cash.service';
import * as fromActions from './cash.actions';

@Injectable()
export class CashEffects {
  public constructor(
    private readonly _actions$: Actions,
    private readonly _cashService: CashService
  ) {}

  public fetchProductsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType<ReturnType<typeof fromActions.fetchDenominationsRequest>>(
        fromActions.fetchDenominationsRequest
      ),
      switchMap(() =>
        this._cashService.fetchDenominations().pipe(
          map((denominations) =>
            fromActions.fetchDenominationsSuccess({
              payload: {
                denominations,
              },
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              fromActions.fetchDenominationsFailure({
                payload: { error },
              })
            )
          )
        )
      )
    )
  );
}
