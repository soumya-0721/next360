import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Login } from './login';
import { AuthService } from '../../../core/services/auth.service';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the welcome heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Welcome Back');
  });

  it('should reject an empty form', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    expect(component.error()).toContain('email and password');
  });

  it('should log the user in', () => {
    const authService = TestBed.inject(AuthService);
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form') as HTMLFormElement;
    (form.elements.namedItem('email') as HTMLInputElement).value = 'ananya@example.com';
    (form.elements.namedItem('password') as HTMLInputElement).value = 'secret';

    form.dispatchEvent(new Event('submit'));
    expect(authService.isLoggedIn()).toBe(true);
    expect(component.error()).toBe('');
  });
});
