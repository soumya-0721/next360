import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  readonly cartService = inject(CartService);

  readonly payment = signal('cod');
  readonly placed = signal(false);
  readonly orderId = signal('');
  readonly error = signal('');

  onPaymentChange(event: Event): void {
    this.payment.set((event.target as HTMLInputElement).value);
  }

  placeOrder(event: Event): void {
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const address = String(data.get('address') ?? '').trim();
    const city = String(data.get('city') ?? '').trim();
    const state = String(data.get('state') ?? '').trim();
    const pincode = String(data.get('pincode') ?? '').trim();

    if (!name || !phone || !address || !city || !state || !pincode) {
      this.error.set('Please fill in all delivery details.');
      return;
    }

    this.error.set('');
    this.orderId.set(`NX${Date.now().toString().slice(-6)}`);
    this.cartService.clear();
    this.placed.set(true);
  }
}
