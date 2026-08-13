import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

/**
 * Reusable scroll-reveal behavior.
 *
 * Usage: <div appReveal [revealDelay]="120">
 *
 * Adds the `reveal` class (hidden state) and, once the element enters the
 * viewport, adds `reveal--visible` which triggers the CSS transition.
 * Global styles live in src/styles.css under `.reveal`.
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0;

  private observer?: IntersectionObserver;

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const element = this.el.nativeElement;

    // Never hide content during SSR or when IntersectionObserver is unavailable.
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      element.classList.add('reveal--visible');
      return;
    }

    element.classList.add('reveal');
    if (this.revealDelay > 0) {
      element.style.setProperty('--reveal-delay', `${this.revealDelay}ms`);
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            element.classList.add('reveal--visible');
            this.observer?.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
