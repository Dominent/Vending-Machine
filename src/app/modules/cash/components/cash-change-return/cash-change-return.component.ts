import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-cash-change-return',
  templateUrl: './cash-change-return.component.html',
  styleUrls: ['./cash-change-return.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CashChangeReturnComponent {
  @ViewChild('coinTray') coinTray: ElementRef | undefined;

  @Input()
  public change: number | undefined;

  public simulateChangeReturn(amount: number) {
    const maxDelay = 1;

    for (let i = 0; i < amount; i++) {
      const coin = document.createElement('div');
      coin.classList.add('coin');
      this.coinTray?.nativeElement.appendChild(coin);

      coin.style.left = `${
        Math.random() * (this.coinTray?.nativeElement.offsetWidth - 30)
      }px`;

      const fallDelay = Math.random() * maxDelay;
      coin.style.animationDelay = `${fallDelay}s, ${fallDelay + 1}s, ${
        fallDelay + 1.5
      }s, ${fallDelay + 31.5}s`;

      setTimeout(() => coin.remove(), (fallDelay + 32.5) * 1000); // Convert seconds to milliseconds
    }
  }
}
