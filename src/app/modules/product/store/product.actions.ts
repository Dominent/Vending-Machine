import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IProduct } from '../models/product.models';

export const fetchProductsRequest = createAction(
  '[PRODUCT]FETCH_PRODUCT_REQUEST'
);
export const fetchProductsSuccess = createAction(
  '[PRODUCT]FETCH_PRODUCT_SUCCESS',
  props<{ payload: { products: IProduct[] } }>()
);
export const fetchProductsFailure = createAction(
  '[PRODUCT]FETCH_PRODUCT_FAILURE',
  props<{ payload: { error: HttpErrorResponse } }>()
);

export const addSelectedProduct = createAction(
  '[PRODUCT]ADD_SELECTED_PRODUCT',
  props<{ payload: { product: IProduct } }>()
);

export const resetSelectedProduct = createAction(
  '[PRODUCT]RESET_SELECTED_PRODUCT'
);
