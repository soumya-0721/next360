import { Component, computed, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  readonly product = input.required<Product>();

  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);

  readonly isWishlisted = computed(() => this.wishlistService.isWishlisted(this.product().slug));
  readonly ratingWidth = computed(() => (this.product().rating / 5) * 100);
  readonly wishAriaLabel = computed(() =>
    this.isWishlisted() ? `Remove ${this.product().name} from wishlist` : `Add ${this.product().name} to wishlist`
  );

  toggleWish(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.wishlistService.toggle(this.product().slug);
  }

  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.product().inStock) {
      this.cartService.add(this.product());
    }
  }
}
