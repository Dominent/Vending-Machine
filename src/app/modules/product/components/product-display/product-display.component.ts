import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../models/product.models';
import { ProductStoreFacadeService } from '../../store/product-store-facade.service';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.scss'],
  host: { class: 'mat-elevation-z8' },
})
export class ProductDisplayComponent implements OnInit {
  @Input()
  public products: IProduct[] | undefined;

  constructor(private _productStoreFacadeService: ProductStoreFacadeService) {}

  ngOnInit() {}

  public handleProductClick(product: IProduct) {
    this._productStoreFacadeService.actions.addProduct(product);
  }
}
