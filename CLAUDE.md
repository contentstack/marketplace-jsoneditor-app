## Developer Ecosystem workflow (read first)

This repo belongs to a Developer Ecosystem pod (DevEx: MCP, CLI, SDK, Starters including the SAP connector; Marketplace; Mkt Apps; Developer Hub).
New features and changes go through the deveco workflow before any code is written here:

1. Find the work's DSCDX idea and where it is in the flow. No idea yet: write one with the `brief` skill in `contentstack/product-wiki`.
2. The PRD, TRD, test cases, tickets and code come from your own routines (PM, Architect, QA agent, Dev), gate by gate. Do not plan, draft or build them in this session. No routine for a step yet: set it up with the `deveco-aisdlc-onboarding` skill in `contentstack/agent-skills`.
3. The order, gates and intake: https://github.com/contentstack/agent-skills/blob/main/skills/deveco-aisdlc-onboarding/references/run-protocol.md

Bug fixes and support cases keep this repo's usual path. Not sure which applies? Ask before building.


## This repo

JSON Editor: a Marketplace custom field (Tier 1, UI-only) built on `jsoneditor` (modes: code, form, text, tree, view). It saves `[object]` or `[JSON string]` through `location.field.setData`, depending on the global `isStringified` app setting. Wiki: `marketplace-apps/jsoneditor/` in `contentstack/product-wiki` if present.

| Task             | Command (Node >=22.12)                                                                              |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| Install          | `npm ci`                                                                                            |
| Run locally      | `npm start` (http://localhost:3000; the app only renders inside Contentstack, at `/#/custom-field`) |
| Lint / typecheck | `npm run lint` · `npm run typecheck`                                                                |
| Unit tests       | `npm test` · `npm run test:coverage` (fails under 90%)                                              |
| Build            | `npm run build` (output `build/`, git-ignored)                                                      |

- Routing switches to `HashRouter` when the URL has `#`, because Contentstack loads the app in an iframe; manifest paths are `/#/custom-field` and `/#/config` (`update-app-info.json`).
- Tests are Vitest specs next to the code (`*.spec.tsx`). Expected values come from the spec, not from running the code. Known bugs are `it.skip` with a `// BUG:` comment.
- The in-repo Playwright suite (`tests/`) needs the `.env.example` variables and a Contentstack account; it is not part of CI.
