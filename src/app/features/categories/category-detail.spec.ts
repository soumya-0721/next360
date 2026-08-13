import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CategoryDetail } from './category-detail';

describe('CategoryDetail', () => {
  let component: CategoryDetail;
  let fixture: ComponentFixture<CategoryDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryDetail],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryDetail);
    component = fixture.componentInstance;
    component.slug.set('organic-grains');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resolve the category and its products', () => {
    expect(component.category()?.name).toBe('Grains & Millets');
    expect(component.products().length).toBeGreaterThan(0);
  });
});
