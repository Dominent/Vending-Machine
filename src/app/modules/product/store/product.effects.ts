import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProductService } from '../services/product.service';
import * as fromActions from './product.actions';

@Injectable()
export class ProductEffects {
  public constructor(
    private readonly _actions$: Actions,
    private readonly _productService: ProductService
  ) {}

  public fetchProductsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType<ReturnType<typeof fromActions.fetchProductsRequest>>(
        fromActions.fetchProductsRequest
      ),
      switchMap(() =>
        this._productService.fetchProducts().pipe(
          map((products) =>
            fromActions.fetchProductsSuccess({
              payload: {
                products,
              },
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              fromActions.fetchProductsFailure({
                payload: { error },
              })
            )
          )
        )
      )
    )
  );
}
