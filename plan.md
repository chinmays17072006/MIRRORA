# MIRRORA — implementation plan

## Product direction

MIRRORA is a stage-ready, synthetic-data-only financial network intelligence prototype. The original brief is ambitious; for the screening round, the experience is intentionally shaped around one memorable workflow rather than many disconnected screens:

**DETECT → EXPLAIN → CHALLENGE → VALIDATE → INVESTIGATE**

The showcase scenario is ACC-1042. Every visible explanation maps back to seeded synthetic transactions, and every risk score is a transparent weighted calculation — never presented as a production fraud verdict.

## Implementation approach

- **Frontend:** Vite + React + TypeScript, single-page application with view state rather than a heavy router so the live demo stays fast and offline-capable.
- **Data layer:** deterministic synthetic dataset in `src/data.ts`, including a showcase network, alert rows, transaction rows, and explainability metadata. The same records power the network view, feature evidence, explorer, analyst answers, report, and CSV/PDF-style print export.
- **Risk engine:** transparent `computeMirrorScore(activeSignals)` function. Base score is 91. Feature contributions are weighted as Network Concentration 34%, Rapid Pass-Through 27%, Transaction Velocity 21%, Counterparty Pattern 11%, Dormant Activation 7%. Removing signals recomputes the score with a floor for residual context, and explanation text is derived from the selected controls.
- **Visualizations:** CSS/SVG network graph with connected nodes and animated signal paths; SVG radial stability gauge; inline bar charts and sparklines. This avoids runtime dependencies while keeping the graph visually central and makes the offline guarantee explicit.
- **Interaction model:** landing page starts the presentation; dashboard navigation exposes Command Center, Network Intelligence, Explainability, Risk Mirror, Stability, Report, and Data Explorer. Selecting an alert/node/feature/transaction updates the same selected-account and evidence state.
- **Delivery:** static build on port 3000, no secrets, no external database, no network calls. `public/manus-routes.json` declares the single route. Print export uses `window.print()` with print styles.

## Project structure

- `src/main.tsx` — React entry point.
- `src/App.tsx` — application shell, navigation, state machine, synthetic interactions, view composition.
- `src/data.ts` — synthetic accounts, alerts, transactions, contributions, and helper functions.
- `src/styles.css` — dark fintech visual system, responsive layout, animation, and print styles.
- `public/manus-routes.json` — route manifest required by the managed preview.
- `app.config.ts` — project logo metadata.
- `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html` — build/runtime configuration.

## Design direction

### Candidate styles

1. **Nocturne Operations Console** — 0.07 probability. A dark, high-density intelligence console with electric mint signal lines.
2. **Editorial Risk Observatory** — 0.05 probability. A lighter, document-led investigation workspace with redaction motifs.
3. **Signal Glasswork** — 0.08 probability. A precise dark glass interface with luminous graph traces and analytical typography.

**Chosen style: Signal Glasswork.**

- **Design movement:** Bloomberg-terminal discipline refined with contemporary glassmorphism and data-art direction.
- **Core principles:** evidence before assertion; dense but calm hierarchy; one luminous signal color for actions; every interaction reveals provenance.
- **Color philosophy:** deep ink and graphite create an investigation-room atmosphere; mint/cyan is reserved for trustworthy system signals; amber and coral indicate review urgency, not guilt; soft lavender separates model output from human judgment.
- **Layout paradigm:** a persistent left rail anchors the workflow while the main canvas alternates between wide graph stages and narrow evidence rails. The important content is layered in an asymmetric command surface rather than a centered card grid.
- **Signature elements:** mint “signal paths” connecting account nodes; translucent cards with hairline borders; a five-stage workflow ribbon that turns the product promise into a navigable visual spine.
- **Interaction philosophy:** clicking a signal must reveal its evidence; toggling a signal must visibly change the score; demo actions should feel like opening an investigation, not changing a dashboard filter.
- **Animation:** use restrained 180–500ms ease-out transitions; graph paths shimmer only when selected; mirror score uses a short number tween; cards enter with a slight vertical lift. Avoid looping or decorative motion that competes with evidence.
- **Typography system:** Inter/system sans for interface clarity, Space Mono for IDs, timestamps, scores, and model facts. Uppercase micro-labels use generous tracking; large titles are tight and editorial.
- **Brand essence:** the explainable network investigation cockpit for teams that need to challenge suspicious-pattern alerts; clear, skeptical, credible.
- **Brand voice:** direct, forensic, non-accusatory. Example lines: “The score is a starting point for review.” / “Challenge the evidence, not the person.”
- **Wordmark & logo:** a split-circle mark with two mirrored arcs and a central signal notch, paired with the MIRRORA wordmark.
- **Signature brand color:** `#9EF2D0` — a cool mint signal that reads as clarity rather than warning.

## Acceptance outcomes

- Working landing page with Launch Demo, Explore Network, and How MIRRORA Works actions.
- Command Center with KPI cards, risk overview visualization, recent alerts, and working investigation actions.
- Interactive synthetic network centered on ACC-1042 with risk-colored nodes, transaction edges, filters, timeline, and selected-account panel.
- Explainability view with the five required feature contributions and evidence highlights tied to actual synthetic transactions.
- Risk Mirror hero interaction with five toggles, score recalculation, before/after/change, animated transition, and Mirror Insight.
- Stability view with stress-test values, prototype gauge, and non-scientific disclaimer.
- Investigation report with required sections and working print/export action.
- Data Explorer with search/filter controls, transaction rows, and edge/highlight linkage.
- Safe analyst panel with structured, predefined answers only.
- Persistent synthetic-data and non-fraud disclaimer.

## Build workflow

Install dependencies, run the Vite dev server on the managed port, validate the route manifest and production build, inspect diagnostics, then commit the completed prototype to the canonical `main` branch for a checkpoint.
