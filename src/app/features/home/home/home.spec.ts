import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the hero heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Goodness');
  });

  it('should render key homepage sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Shop the Way Nature Grows');
    expect(compiled.textContent).toContain('Good Things, Worth Bringing Home');
    expect(compiled.textContent).toContain('Why NEXT360');
    expect(compiled.textContent).toContain('Loved by Nature Lovers');
    expect(compiled.textContent).toContain('What Our Customers Say');
  });

  it('should rotate testimonials', () => {
    const start = component.activeTestimonial();
    component.nextTestimonial();
    expect(component.activeTestimonial()).toBe((start + 1) % component.testimonials.length);
  });
});
