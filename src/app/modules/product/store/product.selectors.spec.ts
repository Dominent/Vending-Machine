import * as fromSelectors from './product.selectors';
import { IProductState } from './product.state';

describe('Product Selectors', () => {
  describe('selectProducts Selector', () => {
    it('should select the products', () => {
      const initialState: IProductState = {
        products: [
          {
            id: 1,
            name: 'Product 1',
            price: 100,
            quantity: 10,
            imageName: 'image1.jpg',
          },
        ],
        selected: [],
        error: { fetchProducts: null },
        loading: { fetchProducts: false },
      };

      const result = fromSelectors.selectProducts.projector(initialState);
      expect(result).toEqual([
        {
          id: 1,
          name: 'Product 1',
          price: 100,
          quantity: 10,
          imageName: 'image1.jpg',
        },
      ]);
    });
  });

  describe('selectSelectedProducts Selector', () => {
    it('should select the selected products', () => {
      const initialState: IProductState = {
        products: [],
        selected: [
          {
            id: 2,
            name: 'Product 2',
            price: 200,
            quantity: 5,
            imageName: 'image2.jpg',
          },
        ],
        error: { fetchProducts: null },
        loading: { fetchProducts: false },
      };

      const result =
        fromSelectors.selectSelectedProducts.projector(initialState);
      expect(result).toEqual([
        {
          id: 2,
          name: 'Product 2',
          price: 200,
          quantity: 5,
          imageName: 'image2.jpg',
        },
      ]);
    });
  });

  describe('selectTotalCash$ Selector', () => {
    it('should calculate the total cash', () => {
      const initialState: IProductState = {
        products: [],
        selected: [
          { id: 1, name: 'Product 1', price: 100, quantity: 1, imageName: '' },
          { id: 2, name: 'Product 2', price: 50, quantity: 1, imageName: '' },
        ],
        error: { fetchProducts: null },
        loading: { fetchProducts: false },
      };

      const result = fromSelectors.selectTotalCash$.projector(initialState);
      expect(result).toEqual(150); // 100 + 50
    });
  });
});
