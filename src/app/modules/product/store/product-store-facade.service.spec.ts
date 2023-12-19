import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IProduct } from '../models/product.models';
import { ProductStoreFacadeService } from './product-store-facade.service';
import * as fromActions from './product.actions';
import * as fromSelectors from './product.selectors';

describe('ProductStoreFacadeService', () => {
  let service: ProductStoreFacadeService;
  let store: MockStore;

  const initialState = {
    products: [],
    selectedProducts: [],
    error: null,
    loading: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductStoreFacadeService,
        provideMockStore({ initialState }),
      ],
    });

    service = TestBed.inject(ProductStoreFacadeService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch fetchProduct action', () => {
    spyOn(store, 'dispatch');
    service.actions.fetchProduct();
    expect(store.dispatch).toHaveBeenCalledWith(
      fromActions.fetchProductsRequest()
    );
  });

  it('should dispatch addProduct action with correct payload', () => {
    spyOn(store, 'dispatch');
    const product: IProduct = {
      id: 1,
      name: 'Product 1',
      price: 100,
      quantity: 10,
      imageName: 'image1.jpg',
    };
    service.actions.addProduct(product);
    expect(store.dispatch).toHaveBeenCalledWith(
      fromActions.addSelectedProduct({ payload: { product } })
    );
  });

  it('should dispatch resetSelectedProducts action', () => {
    spyOn(store, 'dispatch');
    service.actions.resetSelectedProducts();
    expect(store.dispatch).toHaveBeenCalledWith(
      fromActions.resetSelectedProduct()
    );
  });

  it('should select products from the store', () => {
    const products: IProduct[] = [
      {
        id: 1,
        name: 'Product 1',
        price: 100,
        quantity: 10,
        imageName: 'image1.jpg',
      },
    ];
    store.overrideSelector(fromSelectors.selectProducts, products);
    service.state.products$.subscribe((selectedProducts) => {
      expect(selectedProducts).toEqual(products);
    });
  });

  it('should select selectedProducts from the store', () => {
    const selectedProducts: IProduct[] = [
      {
        id: 2,
        name: 'Product 2',
        price: 200,
        quantity: 5,
        imageName: 'image2.jpg',
      },
    ];
    store.overrideSelector(
      fromSelectors.selectSelectedProducts,
      selectedProducts
    );
    service.state.selected$.subscribe((selected) => {
      expect(selected).toEqual(selectedProducts);
    });
  });

  it('should select totalCash$ from the store', () => {
    const totalCash = 100;
    store.overrideSelector(fromSelectors.selectTotalCash$, totalCash);
    service.state.totalCash$.subscribe((selectedTotalCash) => {
      expect(selectedTotalCash).toEqual(totalCash);
    });
  });
});
