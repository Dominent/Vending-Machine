import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from './models/product.models';
import { ProductStoreFacadeService } from './store/product-store-facade.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public products$: Observable<IProduct[]>;

  constructor(private _productStoreFacadeService: ProductStoreFacadeService) {
    this.products$ = this._productStoreFacadeService.state.products$;
  }

  ngOnInit() {
    this._productStoreFacadeService.actions.fetchProduct();
  }
}
