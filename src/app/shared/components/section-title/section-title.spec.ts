import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTitle } from './section-title';

describe('SectionTitle', () => {
  let component: SectionTitle;
  let fixture: ComponentFixture<SectionTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionTitle],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionTitle);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Featured Products');
    fixture.componentRef.setInput('eyebrow', 'Explore');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Featured Products');
    expect(compiled.querySelector('.section-title__eyebrow')?.textContent).toContain('Explore');
  });
});
