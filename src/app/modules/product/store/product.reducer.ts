import { createReducer, on } from '@ngrx/store';
import * as fromActions from './product.actions';
import { productInitialState } from './product.state';

export const productReducer = createReducer(
  productInitialState,
  on(fromActions.fetchProductsRequest, (state) => {
    return {
      ...state,
      error: {
        ...state.error,
        fetchProducts: null,
      },
      loading: {
        ...state.loading,
        fetchProducts: true,
      },
    };
  }),
  on(fromActions.fetchProductsSuccess, (state, { payload: { products } }) => {
    return {
      ...state,
      products,
      error: {
        ...state.error,
        fetchProducts: null,
      },
      loading: {
        ...state.loading,
        fetchProducts: false,
      },
    };
  }),
  on(fromActions.fetchProductsFailure, (state, { payload: { error } }) => {
    return {
      ...state,
      error: {
        ...state.error,
        fetchProducts: error,
      },
      loading: {
        ...state.loading,
        fetchProducts: false,
      },
    };
  }),
  on(fromActions.addSelectedProduct, (state, { payload: { product } }) => {
    return {
      ...state,
      selected: [...state.selected, product],
    };
  }),
  on(fromActions.resetSelectedProduct, (state) => {
    return {
      ...state,
      selected: [],
    };
  })
);
