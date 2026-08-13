import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly error = signal('');

  submit(event: Event): void {
    const form = event.target as HTMLFormElement | null;
    if (!form) {
      return;
    }
    const data = new FormData(form);
    const email = String(data.get('email') ?? '').trim();
    const password = String(data.get('password') ?? '');

    if (!email || !password) {
      this.error.set('Please enter your email and password.');
      return;
    }

    this.error.set('');
    this.authService.login(email);
    this.router.navigate(['/']);
  }

  onLogoError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    img.src = 'logo.svg';
  }
}
