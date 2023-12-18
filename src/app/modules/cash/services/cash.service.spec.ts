/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CashService } from './cash.service';

describe('Service: Cash', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CashService]
    });
  });

  it('should ...', inject([CashService], (service: CashService) => {
    expect(service).toBeTruthy();
  }));
});
