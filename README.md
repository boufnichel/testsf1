# Todos

A React + TypeScript app built with [Vite](https://vite.dev), tested with
[Vitest](https://vitest.dev) and React Testing Library, and linted with ESLint.

## Setup

Requires Node.js 22.13+ (or 24+).

```sh
npm ci
```

## Scripts

| Command           | What it does                                          |
| ----------------- | ----------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server (http://localhost:5173)     |
| `npm run build`   | Type-check with `tsc -b` and build to `dist/`         |
| `npm run preview` | Serve the production build from `dist/` locally       |
| `npm test`        | Run the test suite once with Vitest (`vitest run`)    |
| `npm run lint`    | Lint the project with ESLint                          |

## Tests

Tests live next to the code they cover as `*.test.tsx` files and run in a jsdom
environment. `src/test/setup.ts` registers the
[`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom)
matchers (e.g. `toBeInTheDocument`) and cleans up rendered components after
each test.

```sh
npm test            # run all tests once
npx vitest          # run in watch mode while developing
```
