import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Checkout } from './checkout';
import { CartService } from '../../core/services/cart.service';
import { PRODUCTS } from '../../core/data/products';

describe('Checkout', () => {
  let component: Checkout;
  let fixture: ComponentFixture<Checkout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Checkout],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Checkout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the empty state when the cart is empty', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Your Cart is Empty');
  });

  it('should place an order and clear the cart', () => {
    const cartService = TestBed.inject(CartService);
    cartService.add(PRODUCTS[0]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form') as HTMLFormElement;
    (form.elements.namedItem('name') as HTMLInputElement).value = 'Ananya Sharma';
    (form.elements.namedItem('phone') as HTMLInputElement).value = '9876543210';
    (form.elements.namedItem('address') as HTMLTextAreaElement).value = '12 Green Lane';
    (form.elements.namedItem('city') as HTMLInputElement).value = 'Mumbai';
    (form.elements.namedItem('state') as HTMLInputElement).value = 'Maharashtra';
    (form.elements.namedItem('pincode') as HTMLInputElement).value = '400001';

    form.dispatchEvent(new Event('submit'));
    expect(component.placed()).toBe(true);
    expect(component.orderId()).toContain('NX');
    expect(cartService.isEmpty()).toBe(true);
  });
});
