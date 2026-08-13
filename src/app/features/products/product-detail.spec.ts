import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProductDetail } from './product-detail';

describe('ProductDetail', () => {
  let component: ProductDetail;
  let fixture: ComponentFixture<ProductDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetail],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetail);
    component = fixture.componentInstance;
    component.slug.set('organic-forest-honey');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resolve the product', () => {
    expect(component.product()?.name).toBe('Organic Forest Honey');
  });

  it('should adjust quantity within limits', () => {
    component.increment();
    expect(component.quantity()).toBe(2);
    component.decrement();
    expect(component.quantity()).toBe(1);
  });

  it('should toggle accordion sections', () => {
    expect(component.isOpen('description')).toBe(true);
    component.toggleSection('description');
    expect(component.isOpen('description')).toBe(false);
  });
});
