import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { ProductCard } from '../../shared/components/product-card/product-card';

@Component({
  selector: 'app-category-detail',
  imports: [RouterLink, ProductCard],
  templateUrl: './category-detail.html',
  styleUrl: './category-detail.css',
})
export class CategoryDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);

  readonly slug = signal('');
  readonly category = computed(() => this.productService.getCategory(this.slug()));
  readonly products = computed(() => this.productService.getProductsByCategory(this.slug()));

  constructor() {
    this.route.paramMap.subscribe((params) => this.slug.set(params.get('slug') ?? ''));
  }
}
