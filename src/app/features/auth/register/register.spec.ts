import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Register } from './register';
import { AuthService } from '../../../core/services/auth.service';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reject mismatched passwords', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form') as HTMLFormElement;
    (form.elements.namedItem('name') as HTMLInputElement).value = 'Ananya Sharma';
    (form.elements.namedItem('email') as HTMLInputElement).value = 'ananya@example.com';
    (form.elements.namedItem('phone') as HTMLInputElement).value = '9876543210';
    (form.elements.namedItem('password') as HTMLInputElement).value = 'secret1';
    (form.elements.namedItem('confirmPassword') as HTMLInputElement).value = 'secret2';

    form.dispatchEvent(new Event('submit'));
    expect(component.error()).toContain('do not match');
  });

  it('should register a new account', () => {
    const authService = TestBed.inject(AuthService);
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form') as HTMLFormElement;
    (form.elements.namedItem('name') as HTMLInputElement).value = 'Ananya Sharma';
    (form.elements.namedItem('email') as HTMLInputElement).value = 'ananya@example.com';
    (form.elements.namedItem('phone') as HTMLInputElement).value = '9876543210';
    (form.elements.namedItem('password') as HTMLInputElement).value = 'secret1';
    (form.elements.namedItem('confirmPassword') as HTMLInputElement).value = 'secret1';

    form.dispatchEvent(new Event('submit'));
    expect(authService.isLoggedIn()).toBe(true);
    expect(authService.user()?.name).toBe('Ananya Sharma');
  });
});
