import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { ProductCard } from '../../shared/components/product-card/product-card';

@Component({
  selector: 'app-shop',
  imports: [RouterLink, ProductCard, DecimalPipe],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  private readonly wishlistService = inject(WishlistService);

  readonly categories = this.productService.categories;
  readonly ratingOptions = [0, 4, 4.5, 4.8];

  readonly searchTerm = signal('');
  readonly selectedCategories = signal<string[]>([]);
  readonly maxPrice = signal(1500);
  readonly minRating = signal(0);
  readonly inStockOnly = signal(false);
  readonly organicOnly = signal(false);
  readonly sort = signal('featured');
  readonly wishlistOnly = signal(false);
  readonly filtersOpen = signal(false);

  constructor() {
    this.route.queryParamMap.subscribe((params) => {
      this.searchTerm.set(params.get('q') ?? '');
      const category = params.get('category');
      this.selectedCategories.set(category ? [category] : []);
      this.wishlistOnly.set(params.get('wishlist') === 'true');
      const sort = params.get('sort');
      if (sort) {
        this.sort.set(sort);
      }
      this.minRating.set(Number(params.get('rating')) || 0);
    });
  }

  readonly filteredProducts = computed(() => {
    let products = this.productService.products();

    if (this.wishlistOnly()) {
      products = products.filter((p) => this.wishlistService.isWishlisted(p.slug));
    }

    const term = this.searchTerm().trim().toLowerCase();
    if (term) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.categoryName.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    const selected = this.selectedCategories();
    if (selected.length) {
      products = products.filter((p) => selected.includes(p.category));
    }

    products = products.filter((p) => p.price <= this.maxPrice());

    if (this.minRating() > 0) {
      products = products.filter((p) => p.rating >= this.minRating());
    }

    if (this.inStockOnly()) {
      products = products.filter((p) => p.inStock);
    }

    if (this.organicOnly()) {
      products = products.filter((p) => p.organic);
    }

    switch (this.sort()) {
      case 'newest':
        products = [...products].sort(
          (a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false)
        );
        break;
      case 'price-asc':
        products = [...products].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products = [...products].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products = [...products].sort((a, b) => b.rating - a.rating);
        break;
      case 'bestsellers':
        products = products.filter((p) => p.bestSeller);
        break;
      default:
        products = [...products].sort(
          (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false)
        );
    }

    return products;
  });

  readonly emptyTitle = computed(() =>
    this.wishlistOnly() ? 'Your wishlist is empty' : 'Nothing found'
  );
  readonly emptyText = computed(() =>
    this.wishlistOnly()
      ? 'Discover something naturally good.'
      : 'Try adjusting your filters or explore something new.'
  );

  toggleCategory(slug: string): void {
    this.selectedCategories.update((current) =>
      current.includes(slug) ? current.filter((c) => c !== slug) : [...current, slug]
    );
  }

  onPriceChange(event: Event): void {
    this.maxPrice.set(Number((event.target as HTMLInputElement).value));
  }

  onRatingChange(rating: number): void {
    this.minRating.set(rating);
  }

  onStockChange(event: Event): void {
    this.inStockOnly.set((event.target as HTMLInputElement).checked);
  }

  onOrganicChange(event: Event): void {
    this.organicOnly.set((event.target as HTMLInputElement).checked);
  }

  onSortChange(event: Event): void {
    this.sort.set((event.target as HTMLSelectElement).value);
  }

  toggleFilters(): void {
    this.filtersOpen.update((open) => !open);
  }

  clearFilters(): void {
    this.selectedCategories.set([]);
    this.maxPrice.set(1500);
    this.minRating.set(0);
    this.inStockOnly.set(false);
    this.organicOnly.set(false);
    this.sort.set('featured');
    this.wishlistOnly.set(false);
    this.searchTerm.set('');
    this.router.navigate(['/shop']);
  }
}
