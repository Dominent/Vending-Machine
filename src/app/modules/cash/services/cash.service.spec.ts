import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment.development';
import { IDenomination } from '../models/cash.models';
import { CashService } from './cash.service';

describe('CashService', () => {
  let service: CashService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CashService],
    });

    service = TestBed.inject(CashService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifies that no requests are outstanding.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch denominations', () => {
    const testDenominations: IDenomination[] = [
      { denomination: 10, id: 1, quantity: 20 },
      {
        denomination: 5,
        id: 2,
        quantity: 10,
      },
    ];

    service.fetchDenominations().subscribe((denominations) => {
      expect(denominations).toEqual(testDenominations);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/coins`);
    expect(req.request.method).toBe('GET');
    req.flush(testDenominations);
  });
});
