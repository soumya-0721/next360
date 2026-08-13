import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CategoryCard } from '../../shared/components/category-card/category-card';

@Component({
  selector: 'app-categories',
  imports: [RouterLink, CategoryCard],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  private readonly productService = inject(ProductService);

  readonly categories = this.productService.categories;
}
