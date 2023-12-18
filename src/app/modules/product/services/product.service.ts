import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IProduct } from '../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _httpClient: HttpClient) {}

  public fetchProducts(): Observable<IProduct[]> {
    return this._httpClient.get<IProduct[]>(`${environment.apiUrl}/products`);
  }
}
