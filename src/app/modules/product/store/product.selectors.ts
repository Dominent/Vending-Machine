import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProductState, productStateFeatureKey } from './product.state';

const selectProductState = createFeatureSelector<IProductState>(
  productStateFeatureKey
);

export const selectProducts = createSelector(
  selectProductState,
  (state) => state.products
);

export const selectSelectedProducts = createSelector(
  selectProductState,
  (state) => state.selected
);

export const selectTotalCash$ = createSelector(selectProductState, (state) =>
  state.selected?.reduce((acc, product) => acc + product.price, 0)
);
