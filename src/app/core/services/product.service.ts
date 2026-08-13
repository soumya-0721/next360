import { Injectable, computed, signal } from '@angular/core';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { Category, Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  readonly products = signal<Product[]>(PRODUCTS);
  readonly categories = signal<Category[]>(CATEGORIES);

  readonly featuredProducts = computed(() => this.products().filter((p) => p.featured));
  readonly bestSellers = computed(() => this.products().filter((p) => p.bestSeller));
  readonly newArrivals = computed(() => this.products().filter((p) => p.isNew));

  getProduct(slug: string): Product | undefined {
    return this.products().find((p) => p.slug === slug);
  }

  getCategory(slug: string): Category | undefined {
    return this.categories().find((c) => c.slug === slug);
  }

  getProductsByCategory(categorySlug: string): Product[] {
    return this.products().filter((p) => p.category === categorySlug);
  }

  getRelatedProducts(product: Product, limit = 4): Product[] {
    return this.products()
      .filter((p) => p.category === product.category && p.slug !== product.slug)
      .concat(this.products().filter((p) => p.category !== product.category && p.slug !== product.slug))
      .slice(0, limit);
  }

  searchProducts(term: string): Product[] {
    const query = term.trim().toLowerCase();
    if (!query) {
      return this.products();
    }
    return this.products().filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.categoryName.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }
}
