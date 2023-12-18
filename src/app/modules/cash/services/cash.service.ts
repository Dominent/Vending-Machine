import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IDenomination } from '../models/cash.models';

@Injectable({
  providedIn: 'root',
})
export class CashService {
  constructor(private _httpClient: HttpClient) {}

  public fetchDenominations(): Observable<IDenomination[]> {
    return this._httpClient.get<IDenomination[]>(`${environment.apiUrl}/coins`);
  }
}
