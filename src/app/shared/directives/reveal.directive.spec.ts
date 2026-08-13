import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealDirective } from './reveal.directive';

@Component({
  standalone: true,
  imports: [RevealDirective],
  template: `<div id="target" appReveal [revealDelay]="120">Content</div>`,
})
class HostComponent {}

class IntersectionObserverStub {
  static instances: IntersectionObserverStub[] = [];
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds = [];

  constructor(
    private readonly callback: IntersectionObserverCallback,
    _options?: IntersectionObserverInit
  ) {
    IntersectionObserverStub.instances.push(this);
  }

  observe(target: Element): void {
    this.callback(
      [{ isIntersecting: true, target, intersectionRatio: 1 } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    );
  }

  disconnect(): void {}
  unobserve(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

describe('RevealDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeAll(() => {
    (globalThis as { IntersectionObserver?: unknown }).IntersectionObserver = IntersectionObserverStub;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should add the hidden state class then reveal on intersect', () => {
    const el = fixture.nativeElement.querySelector('#target') as HTMLElement;
    expect(el.classList.contains('reveal')).toBe(true);
    expect(el.classList.contains('reveal--visible')).toBe(true);
  });

  it('should set the reveal delay as a CSS variable', () => {
    const el = fixture.nativeElement.querySelector('#target') as HTMLElement;
    expect(el.style.getPropertyValue('--reveal-delay')).toBe('120ms');
  });
});
