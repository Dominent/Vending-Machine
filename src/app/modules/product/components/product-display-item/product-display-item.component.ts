import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models/product.models';

@Component({
  selector: 'app-product-display-item',
  templateUrl: './product-display-item.component.html',
  styleUrls: ['./product-display-item.component.scss'],
})
export class ProductDisplayItemComponent {
  @Input()
  public product: IProduct | undefined;

  @Output()
  public onClick: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  constructor() {}

  public handleClick() {
    this.onClick.emit(this.product);
  }
}
