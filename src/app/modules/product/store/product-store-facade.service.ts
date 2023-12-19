import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IProduct } from '../models/product.models';
import * as fromActions from './product.actions';
import * as fromSelectors from './product.selectors';

@Injectable({
  providedIn: 'root',
})
export class ProductStoreFacadeService {
  public constructor(private readonly _store: Store<{}>) {}

  public get actions() {
    return {
      fetchProduct: () =>
        this._store.dispatch(fromActions.fetchProductsRequest()),
      addProduct: (product: IProduct) =>
        this._store.dispatch(
          fromActions.addSelectedProduct({
            payload: {
              product,
            },
          })
        ),
      resetSelectedProducts: () =>
        this._store.dispatch(fromActions.resetSelectedProduct()),
      buySelectedProducts: (products: IProduct[]) =>
        this._store.dispatch(
          fromActions.buySelectedProducts({ payload: { products } })
        ),
    };
  }

  public get state() {
    return {
      products$: this._store.select(fromSelectors.selectProducts),
      selected$: this._store.select(fromSelectors.selectSelectedProducts),
      totalCash$: this._store.select(fromSelectors.selectTotalCash$),
    };
  }

  public get error() {
    return {};
  }

  public get loading() {
    return {};
  }
}
