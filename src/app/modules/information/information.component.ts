import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, IProductGroup } from '../product/models/product.models';
import { ProductStoreFacadeService } from '../product/store/product-store-facade.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
  host: { class: 'mat-elevation-z8' },
})
export class InformationComponent {
  public selectedProducts$: Observable<IProduct[]>;

  constructor(private _productStoreFacadeService: ProductStoreFacadeService) {
    this.selectedProducts$ = this._productStoreFacadeService.state.selected$;
  }

  groupProducts(products: IProduct[]): IProductGroup[] {
    const groupedProducts: { [key: number]: IProductGroup } = {};

    products.forEach((product) => {
      if (!groupedProducts[product.id]) {
        groupedProducts[product.id] = {
          id: product.id,
          name: product.name,
          count: 1,
        };
      } else {
        groupedProducts[product.id].count++;
      }
    });

    const result: IProductGroup[] = Object.values(groupedProducts);

    return result;
  }
}
