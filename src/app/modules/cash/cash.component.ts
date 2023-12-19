import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { IProduct } from '../product/models/product.models';
import { ProductStoreFacadeService } from '../product/store/product-store-facade.service';
import { CashChangeReturnComponent } from './components/cash-change-return/cash-change-return.component';
import { IDenomination } from './models/cash.models';
import { CashStoreFacadeService } from './store/cash-store-facade.service';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss'],
})
export class CashComponent implements OnInit {
  @ViewChild(CashChangeReturnComponent)
  public cashChangeReturnComponent: CashChangeReturnComponent | undefined;

  public denominations$: Observable<IDenomination[]>;
  public totalCash$: Observable<number>;
  public totalInsertedCash$: Observable<number>;
  public change$: Observable<number>;
  public selectedProducts$: Observable<IProduct[]>;

  constructor(
    private _cashStoreFacadeService: CashStoreFacadeService,
    private _productStoreFacadeService: ProductStoreFacadeService
  ) {
    this.denominations$ = this._cashStoreFacadeService.state.denominations$;
    this.totalCash$ = this._productStoreFacadeService.state.totalCash$;
    this.totalInsertedCash$ =
      this._cashStoreFacadeService.state.totalInsertedCash$;

    this.selectedProducts$ = this._productStoreFacadeService.state.selected$;

    this.change$ = combineLatest([
      this.totalCash$,
      this.totalInsertedCash$,
    ]).pipe(
      map(([totalCash, totalInsertedCash]) => {
        const change = totalInsertedCash - totalCash;
        return change > 0 ? change : 0;
      })
    );
  }

  ngOnInit() {
    this._cashStoreFacadeService.actions.fetchDenominations();
  }

  handleBuy(
    totalCash: number | null,
    totalInsertedCash: number | null,
    products: IProduct[]
  ) {
    this.cashChangeReturnComponent?.simulateChangeReturn(10);

    setTimeout(() => {
      this.handleClear();
    }, 5 * 1000);

    this._productStoreFacadeService.actions.buySelectedProducts(products);
  }

  public handleClear() {
    this._cashStoreFacadeService.actions.resetDenomination();
    this._productStoreFacadeService.actions.resetSelectedProducts();
  }
}
