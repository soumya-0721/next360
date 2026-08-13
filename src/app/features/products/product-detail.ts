import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { REVIEWS } from '../../core/data/products';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { ProductCard } from '../../shared/components/product-card/product-card';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, ProductCard, DecimalPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  readonly slug = signal('');
  readonly quantity = signal(1);
  readonly added = signal(false);
  readonly openSections = signal<Record<string, boolean>>({ description: true });
  readonly reviews = REVIEWS;

  readonly product = computed(() => this.productService.getProduct(this.slug()));
  readonly relatedProducts = computed(() =>
    this.product() ? this.productService.getRelatedProducts(this.product()!) : []
  );
  readonly ratingWidth = computed(() => (this.product() ? (this.product()!.rating / 5) * 100 : 0));

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.slug.set(params.get('slug') ?? '');
      this.quantity.set(1);
      this.added.set(false);
      this.openSections.set({ description: true });
    });
  }

  increment(): void {
    this.quantity.update((q) => Math.min(q + 1, 10));
  }

  decrement(): void {
    this.quantity.update((q) => Math.max(q - 1, 1));
  }

  addToCart(): void {
    if (!this.product()) {
      return;
    }
    this.cartService.add(this.product()!, this.quantity());
    this.added.set(true);
    setTimeout(() => this.added.set(false), 1600);
  }

  buyNow(): void {
    if (!this.product()) {
      return;
    }
    this.cartService.add(this.product()!, this.quantity());
    this.router.navigate(['/checkout']);
  }

  toggleSection(key: string): void {
    this.openSections.update((sections) => ({ ...sections, [key]: !sections[key] }));
  }

  isOpen(key: string): boolean {
    return !!this.openSections()[key];
  }
}
