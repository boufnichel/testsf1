# testsf1

[![CI](https://github.com/boufnichel/testsf1/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/boufnichel/testsf1/actions/workflows/ci.yml)

A small to-do list web app built with React + TypeScript and [Vite](https://vite.dev),
tested with [Vitest](https://vitest.dev) and React Testing Library, and linted with ESLint.

## Demo

**Live:** https://boufnichel.github.io/testsf1/ (deployed automatically from
`main` by GitHub Actions).

**What you'll see today:** a "Todos" page where you can add to-dos, tick them
off as done and delete them; your list is saved in the browser (localStorage)
so it survives a page reload.

**Run it locally** (Node.js 22.13+):

```sh
npm ci
npm run dev
```

Then open http://localhost:5173. To try the production build instead:

```sh
npm run build && npm run preview
```

## Status

- **Stack:** Vite + React 19 + TypeScript, Vitest + React Testing Library,
  ESLint, and GitHub Actions CI (lint, tests and build on every pull request
  and push to `main`).
- **What works now:** adding, completing and deleting to-dos, with the list
  persisted to the browser's localStorage. There is no backend and no sync
  between browsers or devices.
- **Product scope:** still to be confirmed by the product owner (see
  [Purpose](#purpose)).

## Purpose

*TBD: to be confirmed by the product owner.*

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

Tests live next to the code they cover as `*.test.ts(x)` files and run in a jsdom
environment. `src/test/setup.ts` registers the
[`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom)
matchers (e.g. `toBeInTheDocument`) and cleans up rendered components after
each test.

```sh
npm test            # run all tests once
npx vitest          # run in watch mode while developing
```

## Getting help

If you are stuck or have a question:

1. [Open a GitHub issue](https://github.com/boufnichel/testsf1/issues/new/choose) using the **Help request** template.
2. Tag the product owner in the issue so they are notified.
