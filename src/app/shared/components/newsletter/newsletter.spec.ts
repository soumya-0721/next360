import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Newsletter } from './newsletter';

describe('Newsletter', () => {
  let component: Newsletter;
  let fixture: ComponentFixture<Newsletter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newsletter],
    }).compileComponents();

    fixture = TestBed.createComponent(Newsletter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a success message after subscribing', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input') as HTMLInputElement;
    input.value = 'hello@example.com';

    const form = compiled.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(component.subscribed()).toBe(true);
    expect(compiled.textContent).toContain('Welcome to the family');
  });
});
