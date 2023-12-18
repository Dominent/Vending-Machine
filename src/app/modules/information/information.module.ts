import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InformationComponent } from './information.component';

@NgModule({
  imports: [CommonModule],
  declarations: [InformationComponent],
  exports: [InformationComponent],
})
export class InformationModule {}
