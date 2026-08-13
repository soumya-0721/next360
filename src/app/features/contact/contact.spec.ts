import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Contact } from './contact';

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the contact form', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.textContent).toContain('Get in Touch');
  });

  it('should show a success message after sending', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form') as HTMLFormElement;
    (form.elements.namedItem('name') as HTMLInputElement).value = 'Ananya';
    (form.elements.namedItem('email') as HTMLInputElement).value = 'ananya@example.com';
    (form.elements.namedItem('message') as HTMLTextAreaElement).value = 'Hello!';

    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(component.sent()).toBe(true);
    expect(compiled.textContent).toContain('Thank you for reaching out');
  });
});
