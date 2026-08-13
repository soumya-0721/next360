import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { About } from './about';

describe('About', () => {
  let component: About;
  let fixture: ComponentFixture<About>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Our Story');
    expect(compiled.textContent).toContain('Our Mission');
    expect(compiled.textContent).toContain('Our Vision');
    expect(compiled.textContent).toContain('Our Values');
    expect(compiled.textContent).toContain('Quality');
    expect(compiled.textContent).toContain('Sustainability');
  });
});
