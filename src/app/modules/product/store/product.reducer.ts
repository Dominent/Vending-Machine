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
  }),
  on(fromActions.buySelectedProducts, (state, { payload: { products } }) => {
    const countMap: { [productId: number]: number } = {};
    products.forEach(({ id }) => {
      if (!countMap[id]) {
        countMap[id] = 1;
      } else {
        countMap[id]++;
      }
    });

    return {
      ...state,
      products: state.products.map((product) => {
        //TODO(PPavlov): Quantity can be bellow zero, bug
        let quantity = product.quantity - (countMap[product.id] || 0);
        return {
          ...product,
          quantity: quantity < 0 ? 0 : quantity,
        };
      }),
    };
  })
);
