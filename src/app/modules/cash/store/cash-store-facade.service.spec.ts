/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CashStoreFacadeService } from './cash-store-facade.service';

describe('Service: CashStoreFacadeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CashStoreFacadeService],
    });
  });

  it('should ...', inject(
    [CashStoreFacadeService],
    (service: CashStoreFacadeService) => {
      expect(service).toBeTruthy();
    }
  ));
});
