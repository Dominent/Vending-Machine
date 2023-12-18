import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { CashComponent } from './cash.component';
import { CashChangeReturnComponent } from './components/cash-change-return/cash-change-return.component';
import { CashInsertionItemComponent } from './components/cash-insertion-item/cash-insertion-item.component';
import { CashInsertionComponent } from './components/cash-insertion/cash-insertion.component';

const material = [MatButtonModule, MatCardModule];

@NgModule({
  imports: [CommonModule, ...material, SharedModule],
  declarations: [
    CashComponent,
    CashInsertionComponent,
    CashInsertionItemComponent,
    CashChangeReturnComponent,
  ],
  exports: [CashComponent],
})
export class CashModule {}
