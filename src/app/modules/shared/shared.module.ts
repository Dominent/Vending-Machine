import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoundPipe } from './pipes/round.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [RoundPipe],
  exports: [RoundPipe],
})
export class SharedModule {}
