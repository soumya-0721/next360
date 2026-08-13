import { Injectable, computed, signal } from '@angular/core';
import { readStorage, writeStorage } from './storage.util';

export interface AuthUser {
  name: string;
  email: string;
}

const STORAGE_KEY = 'next360.user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userSignal = signal<AuthUser | null>(readStorage<AuthUser | null>(STORAGE_KEY, null));

  readonly user = this.userSignal.asReadonly();
  readonly isLoggedIn = computed(() => this.userSignal() !== null);

  login(email: string): void {
    const name = email.split('@')[0] ?? 'Guest';
    this.userSignal.set({ name, email });
    writeStorage(STORAGE_KEY, { name, email });
  }

  register(name: string, email: string): void {
    this.userSignal.set({ name, email });
    writeStorage(STORAGE_KEY, { name, email });
  }

  logout(): void {
    this.userSignal.set(null);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }
}
