import { Component, ElementRef, OnDestroy, OnInit, computed, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { REVIEWS } from '../../../core/data/products';
import { ProductService } from '../../../core/services/product.service';
import { CategoryCard } from '../../../shared/components/category-card/category-card';
import { Newsletter } from '../../../shared/components/newsletter/newsletter';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { SectionTitle } from '../../../shared/components/section-title/section-title';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CategoryCard, ProductCard, SectionTitle, Newsletter, RevealDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  private readonly productService = inject(ProductService);

  readonly heroRef = viewChild<ElementRef<HTMLElement>>('hero');

  readonly categories = computed(() => this.productService.categories().slice(0, 9));
  readonly featuredProducts = computed(() => this.productService.featuredProducts().slice(0, 4));
  readonly bestSellers = computed(() => this.productService.bestSellers().slice(0, 4));
  readonly testimonials = REVIEWS;

  readonly benefits = [
    { title: 'Carefully Selected', text: 'Products chosen with care, from farms we trust.' },
    { title: 'Quality Focused', text: 'A consistent, quality-first selection.' },
    { title: 'Naturally Inspired', text: 'Everything we choose is inspired by nature.' },
    { title: 'Consciously Chosen', text: 'Better choices for you and the planet.' },
  ];

  readonly activeTestimonial = signal(0);

  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.timer = setInterval(() => this.nextTestimonial(), 6000);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  nextTestimonial(): void {
    this.activeTestimonial.update((i) => (i + 1) % this.testimonials.length);
  }

  prevTestimonial(): void {
    this.activeTestimonial.update((i) => (i - 1 + this.testimonials.length) % this.testimonials.length);
  }

  goToTestimonial(index: number): void {
    this.activeTestimonial.set(index);
  }

  onHeroMove(event: MouseEvent): void {
    const el = this.heroRef()?.nativeElement;
    if (!el) {
      return;
    }
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--mx', x.toFixed(3));
    el.style.setProperty('--my', y.toFixed(3));
  }

  onHeroLeave(): void {
    const el = this.heroRef()?.nativeElement;
    if (!el) {
      return;
    }
    el.style.setProperty('--mx', '0');
    el.style.setProperty('--my', '0');
  }
}
