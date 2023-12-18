/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductStoreFacadeService } from './product-store-facade.service';

describe('Service: ProductStoreFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductStoreFacadeService]
    });
  });

  it('should ...', inject([ProductStoreFacadeService], (service: ProductStoreFacadeService) => {
    expect(service).toBeTruthy();
  }));
});
