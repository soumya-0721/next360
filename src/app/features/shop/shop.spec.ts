import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Shop } from './shop';

describe('Shop', () => {
  let component: Shop;
  let fixture: ComponentFixture<Shop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shop],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Shop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list products', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.filteredProducts().length).toBeGreaterThan(0);
    expect(compiled.querySelector('.product-grid')).toBeTruthy();
  });

  it('should filter by category', () => {
    component.toggleCategory('organic-grains');
    const filtered = component.filteredProducts();
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((p) => p.category === 'organic-grains')).toBe(true);
  });

  it('should sort by price ascending', () => {
    component.sort.set('price-asc');
    const filtered = component.filteredProducts();
    const prices = filtered.map((p) => p.price);
    expect([...prices].sort((a, b) => a - b)).toEqual(prices);
  });
});
