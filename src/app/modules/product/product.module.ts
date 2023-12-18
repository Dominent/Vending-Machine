import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProductDisplayItemComponent } from './components/product-display-item/product-display-item.component';
import { ProductDisplayComponent } from './components/product-display/product-display.component';
import { ProductComponent } from './product.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    ProductComponent,
    ProductDisplayComponent,
    ProductDisplayItemComponent,
  ],
  exports: [ProductComponent],
})
export class ProductModule {}
