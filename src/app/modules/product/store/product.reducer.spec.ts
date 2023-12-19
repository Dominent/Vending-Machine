import { HttpErrorResponse } from '@angular/common/http';
import * as fromActions from './product.actions';
import { productReducer } from './product.reducer';
import { productInitialState } from './product.state'; // Import IProductState or define it according to your implementation

describe('ProductReducer', () => {
  it('should return the default state', () => {
    const action = {} as any;
    const state = productReducer(undefined, action);

    expect(state).toBe(productInitialState);
  });

  it('should set loading to true on fetchProductsRequest', () => {
    const action = fromActions.fetchProductsRequest();
    const state = productReducer(productInitialState, action);

    expect(state.loading.fetchProducts).toBe(true);
    expect(state.error.fetchProducts).toBeNull();
  });

  it('should populate products and set loading to false on fetchProductsSuccess', () => {
    const products = [
      {
        id: 1,
        name: 'Product 1',
        price: 100,
        quantity: 10,
        imageName: 'image1.jpg',
      },
    ];
    const action = fromActions.fetchProductsSuccess({ payload: { products } });
    const state = productReducer(productInitialState, action);

    expect(state.products).toEqual(products);
    expect(state.loading.fetchProducts).toBe(false);
    expect(state.error.fetchProducts).toBeNull();
  });

  it('should set error and loading to false on fetchProductsFailure', () => {
    const error = new HttpErrorResponse({ error: new Error('Error') });
    const action = fromActions.fetchProductsFailure({ payload: { error } });
    const state = productReducer(productInitialState, action);

    expect(state.error.fetchProducts).toEqual(error);
    expect(state.loading.fetchProducts).toBe(false);
  });

  it('should add a product to selected on addSelectedProduct', () => {
    const product = {
      id: 2,
      name: 'Product 2',
      price: 200,
      quantity: 5,
      imageName: 'image2.jpg',
    };
    const action = fromActions.addSelectedProduct({ payload: { product } });
    const state = productReducer(productInitialState, action);

    expect(state.selected).toContain(product);
  });

  it('should reset selected products on resetSelectedProduct', () => {
    const action = fromActions.resetSelectedProduct();
    const state = productReducer(productInitialState, action);

    expect(state.selected).toEqual([]);
  });
});
