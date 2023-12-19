import { HttpErrorResponse } from '@angular/common/http';
import { IProduct } from '../models/product.models';
import * as fromActions from './product.actions';

describe('Product Actions', () => {
  describe('fetchProductsRequest Action', () => {
    it('should create the action', () => {
      const action = fromActions.fetchProductsRequest();
      expect({ ...action }).toEqual({ type: '[PRODUCT]FETCH_PRODUCT_REQUEST' });
    });
  });

  describe('fetchProductsSuccess Action', () => {
    it('should create the action with payload', () => {
      const payload = {
        products: [
          {
            id: 1,
            name: 'Product 1',
            price: 100,
            quantity: 10,
            imageName: 'image1.jpg',
          },
        ] as IProduct[],
      };
      const action = fromActions.fetchProductsSuccess({ payload });
      expect({ ...action }).toEqual({
        type: '[PRODUCT]FETCH_PRODUCT_SUCCESS',
        payload,
      });
    });
  });

  describe('fetchProductsFailure Action', () => {
    it('should create the action with error payload', () => {
      const error: HttpErrorResponse = new HttpErrorResponse({
        error: 'Error occurred',
        status: 500,
      });
      const payload = { error };
      const action = fromActions.fetchProductsFailure({ payload });
      expect({ ...action }).toEqual({
        type: '[PRODUCT]FETCH_PRODUCT_FAILURE',
        payload,
      });
    });
  });

  describe('addSelectedProduct Action', () => {
    it('should create the action with payload', () => {
      const payload = {
        product: {
          id: 2,
          name: 'Product 2',
          price: 200,
          quantity: 5,
          imageName: 'image2.jpg',
        } as IProduct,
      };
      const action = fromActions.addSelectedProduct({ payload });
      expect({ ...action }).toEqual({
        type: '[PRODUCT]ADD_SELECTED_PRODUCT',
        payload,
      });
    });
  });

  describe('resetSelectedProduct Action', () => {
    it('should create the action', () => {
      const action = fromActions.resetSelectedProduct();
      expect({ ...action }).toEqual({
        type: '[PRODUCT]RESET_SELECTED_PRODUCT',
      });
    });
  });
});
