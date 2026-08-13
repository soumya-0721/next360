import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-newsletter',
  imports: [],
  templateUrl: './newsletter.html',
  styleUrl: './newsletter.css',
})
export class Newsletter {
  readonly subscribed = signal(false);

  subscribe(event: Event): void {
    const form = event.target as HTMLFormElement;
    const email = String(new FormData(form).get('email') ?? '').trim();
    if (!email || !email.includes('@')) {
      return;
    }
    this.subscribed.set(true);
  }
}
