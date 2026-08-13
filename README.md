# MyApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Deployment (Vercel)

The site is built as a static app with prerendered routes and deployed to Vercel.

1. Push the repository to GitHub.
2. In the [Vercel dashboard](https://vercel.com/new), import the repository.
   Vercel auto-detects the project from `vercel.json` (framework: Angular, build
   command `npm run build`, output directory `dist/my-app/browser`).
3. Deploy. Every push to the connected branch triggers a new deployment.

The site is served at the root domain. Static routes (`/shop`, `/about`, etc.)
are prerendered to real HTML files; dynamic routes (`/products/:slug`) fall back
through `vercel.json` to the app shell.

### Deploying from the CLI

```bash
npm i -g vercel
vercel --prod
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
