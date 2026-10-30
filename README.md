# Marketplace JSON Editor App

A Contentstack Marketplace custom field (JSON data type) that edits JSON with [`jsoneditor`](https://github.com/josdejong/jsoneditor). It saves the value either as an object or as a stringified JSON, depending on the app setting.

## Features

- Five editor modes: code (default), form, text, tree, view
- App configuration screen with the data format setting (`isStringified`)
- Per-content-type `stringify` field setting (see Saved data)
- React 19, Vite, TypeScript, Vitest unit tests, Playwright e2e tests

## Setup

Node >=22.12.

```bash
npm ci
npm start        # http://localhost:3000
```

The app only renders inside Contentstack. It is loaded in an iframe at the manifest paths:

| Location | Path |
|----------|------|
| Custom field (`cs.cm.stack.custom_field`, data type `json`) | `/#/custom-field` |
| App config (`cs.cm.stack.config`) | `/#/config` |

Routing uses `HashRouter` when the URL contains `#` (see `src/containers/App`). The manifest lives in `update-app-info.json`.

## Saved data

The field saves an array through `field.setData`:

- Object format: `[ { ...json } ]`
- Stringified format: `[ "{\"...\":...}" ]`

The format comes from the app config `isStringified` (set on the config screen: "JSON Object" or "JSON Stringified"). A content-type field `stringify` setting is meant to override it, but currently has no effect when editing (known bug, covered by a skipped test). Stored invalid JSON currently shows as `{}` (known bug, skipped test).

## Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Dev server |
| `npm run build` | Typecheck, then production build to `build/` |
| `npm run lint` | ESLint on `src` |
| `npm run typecheck` | `tsc --noEmit` on the app tsconfig |
| `npm test` | Vitest, run once |
| `npm run test:watch` | Vitest watch mode |
| `npm run test:coverage` | Vitest with coverage; fails under 90% lines, branches, functions, statements |
| `npm run test:chrome` | Playwright e2e (also `test:firefox`, `test:safari`, `*-headed`) |

## Testing

Unit tests are Vitest specs next to the code (`src/**/*.spec.tsx`), with `jsdom` and the Contentstack SDK mocked. CI runs lint, typecheck, build and coverage (`.github/workflows/ci.yml`).

E2E tests (`tests/`) need a `.env` copied from `.env.example` and a Contentstack account; they are not part of CI.

## Project structure

```
src/
├── components/   ErrorBoundary, jsoneditor, venus-help (help icon)
├── containers/   App (routes), ConfigScreen, CustomField
├── common/       constants, locale, types, utils
├── hooks/        useAppSdk, useAnalytics
├── test-utils/   fake SDK and fake jsoneditor for specs
└── main.tsx      entry
tests/            Playwright e2e
```

## License

MIT, see [LICENSE](LICENSE).
