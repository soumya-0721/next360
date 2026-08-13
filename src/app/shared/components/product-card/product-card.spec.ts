import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProductCard } from './product-card';
import { Product } from '../../../core/models/product';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  const product: Product = {
    slug: 'organic-forest-honey',
    name: 'Organic Forest Honey',
    category: 'honey-sweeteners',
    categoryName: 'Honey & Natural Sweeteners',
    image: 'images/honey.jpg',
    price: 499,
    originalPrice: 599,
    rating: 4.8,
    reviewCount: 214,
    organic: true,
    inStock: true,
    badge: 'Organic',
    description: 'Raw forest honey.',
    benefits: ['Natural'],
    ingredients: 'Honey',
    usage: 'Use in tea.',
    shipping: '2-4 days.',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', product);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the product name and price', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Organic Forest Honey');
    expect(compiled.textContent).toContain('₹499');
  });
});
