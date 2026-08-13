import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home/home').then((m) => m.Home),
    title: 'NEXT360 Organic Products',
  },
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/shop').then((m) => m.Shop),
    title: 'Shop Organic Products | NEXT360',
  },
  {
    path: 'categories',
    loadComponent: () => import('./features/categories/categories').then((m) => m.Categories),
    title: 'Categories | NEXT360',
  },
  {
    path: 'categories/:slug',
    loadComponent: () => import('./features/categories/category-detail').then((m) => m.CategoryDetail),
    title: 'Category | NEXT360',
  },
  {
    path: 'products/:slug',
    loadComponent: () => import('./features/products/product-detail').then((m) => m.ProductDetail),
    title: 'Product | NEXT360',
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart').then((m) => m.Cart),
    title: 'Your Cart | NEXT360',
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout').then((m) => m.Checkout),
    title: 'Checkout | NEXT360',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
    title: 'Login | NEXT360',
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
    title: 'Create Account | NEXT360',
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then((m) => m.About),
    title: 'Our Story | NEXT360',
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
    title: 'Contact Us | NEXT360',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
