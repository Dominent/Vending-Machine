import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment.development';
import { IProduct } from '../models/product.models';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products', () => {
    const expectedProducts: IProduct[] = [
      {
        id: 1,
        name: 'Product 1',
        price: 100,
        quantity: 10,
        imageName: 'image1.jpg',
      },
    ];

    service.fetchProducts().subscribe((products) => {
      expect(products).toEqual(expectedProducts);
    });

    const req = httpTestingController.expectOne(
      `${environment.apiUrl}/products`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(expectedProducts);
  });
});
