import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import * as fromActions from './product.actions';
import { ProductEffects } from './product.effects';

describe('ProductEffects', () => {
  let effects: ProductEffects;
  let actions$: Observable<any>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', [
      'fetchProducts',
    ]);

    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        provideMockActions(() => actions$),
        { provide: ProductService, useValue: productServiceSpy },
      ],
    });

    effects = TestBed.inject(ProductEffects);
    productService = TestBed.inject(
      ProductService
    ) as jasmine.SpyObj<ProductService>;
  });

  it('should return a fetchProductsSuccess action, with products, on success', () => {
    const products = [
      {
        id: 1,
        name: 'Product 1',
        price: 100,
        quantity: 10,
        imageName: 'image1.jpg',
      },
    ];
    const action = fromActions.fetchProductsRequest();
    const completion = fromActions.fetchProductsSuccess({
      payload: { products },
    });

    actions$ = hot('-a', { a: action });
    const response = cold('-b|', { b: products });
    const expected = cold('--c', { c: completion });

    productService.fetchProducts.and.returnValue(response);

    expect(effects.fetchProductsEffect$).toBeObservable(expected);
  });

  it('should return a fetchProductsFailure action, with an error, on failure', () => {
    const error: HttpErrorResponse = new HttpErrorResponse({
      error: 'test error',
      status: 500,
    });
    const action = fromActions.fetchProductsRequest();
    const completion = fromActions.fetchProductsFailure({ payload: { error } });

    actions$ = hot('-a', { a: action });
    const response = cold('-#', {}, error);
    const expected = cold('--c', { c: completion });

    productService.fetchProducts.and.returnValue(response);

    expect(effects.fetchProductsEffect$).toBeObservable(expected);
  });
});
