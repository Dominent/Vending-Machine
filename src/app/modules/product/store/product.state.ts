import { HttpErrorResponse } from '@angular/common/http';
import { IProduct } from '../models/product.models';

export const productStateFeatureKey = 'product';

export interface IProductState {
  products: IProduct[];
  selected: IProduct[];
  error: {
    fetchProducts: HttpErrorResponse | null;
  };
  loading: {
    fetchProducts: boolean;
  };
}

export const productInitialState: IProductState = {
  products: [],
  selected: [],
  error: {
    fetchProducts: null,
  },
  loading: {
    fetchProducts: false,
  },
};
