import { Injectable, computed, signal } from '@angular/core';
import { readStorage, writeStorage } from './storage.util';

const STORAGE_KEY = 'next360.wishlist';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private readonly slugsSignal = signal<string[]>(readStorage<string[]>(STORAGE_KEY, []));

  readonly slugs = this.slugsSignal.asReadonly();
  readonly count = computed(() => this.slugs().length);

  isWishlisted(slug: string): boolean {
    return this.slugsSignal().includes(slug);
  }

  toggle(slug: string): void {
    const current = this.slugsSignal();
    const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug];
    this.slugsSignal.set(next);
    writeStorage(STORAGE_KEY, next);
  }
}
