import { Injectable, computed, signal } from '@angular/core';
import { CartItem, Product } from '../models/product';
import { readStorage, writeStorage } from './storage.util';

const STORAGE_KEY = 'next360.cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly itemsSignal = signal<CartItem[]>(readStorage<CartItem[]>(STORAGE_KEY, []));

  readonly items = this.itemsSignal.asReadonly();
  readonly count = computed(() => this.items().reduce((sum, item) => sum + item.quantity, 0));
  readonly subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );
  readonly delivery = computed(() => (this.subtotal() === 0 || this.subtotal() >= 1000 ? 0 : 49));
  readonly total = computed(() => this.subtotal() + this.delivery());
  readonly isEmpty = computed(() => this.items().length === 0);

  add(product: Product, quantity = 1): void {
    const items = [...this.itemsSignal()];
    const existing = items.find((item) => item.product.slug === product.slug);
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({ product, quantity });
    }
    this.itemsSignal.set(items);
    this.persist();
  }

  setQuantity(slug: string, quantity: number): void {
    const next = this.itemsSignal()
      .map((item) =>
        item.product.slug === slug ? { ...item, quantity: Math.max(1, quantity) } : item
      )
      .filter((item) => item.quantity > 0);
    this.itemsSignal.set(next);
    this.persist();
  }

  remove(slug: string): void {
    this.itemsSignal.set(this.itemsSignal().filter((item) => item.product.slug !== slug));
    this.persist();
  }

  clear(): void {
    this.itemsSignal.set([]);
    this.persist();
  }

  private persist(): void {
    writeStorage(STORAGE_KEY, this.itemsSignal());
  }
}
