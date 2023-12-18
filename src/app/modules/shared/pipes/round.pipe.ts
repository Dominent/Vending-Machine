import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round',
})
export class RoundPipe implements PipeTransform {
  transform(value: number, digits?: number): number {
    if (!digits) digits = 0; // Default to 0 decimal places if not specified
    return Number(value.toFixed(digits));
  }
}
