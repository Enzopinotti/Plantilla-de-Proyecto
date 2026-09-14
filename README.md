# Plantilla de Proyecto — Node Service Starter

> **Status:** modernization in progress. This branch is replacing an older general-purpose Express backend skeleton with a smaller, testable and reusable service starter.

This repository is intended to become a clean starting point for small Node.js HTTP services: enough structure to begin a real project with good engineering defaults, without shipping authentication, databases, uploads, sockets, email and every possible integration by default.

Tracked in [#1](https://github.com/Enzopinotti/Plantilla-de-Proyecto/issues/1).

## Design goals

The starter should be:

- **small** — minimal dependencies and no unused feature packages;
- **explicit** — configuration, errors and runtime lifecycle are easy to find;
- **testable** — important bootstrap and HTTP behavior can be verified without external services;
- **reproducible** — one documented install/check path works locally and in CI;
- **production-aware** — graceful shutdown, health checks and structured errors are part of the foundation;
- **extensible** — databases, authentication, queues and integrations can be added as project-specific modules instead of living in the template by default.

## Target V1 contract

The modernization will establish a **Node.js + TypeScript HTTP service starter** with:

- current Node LTS support;
- TypeScript;
- an explicit package-manager/lockfile policy;
- validated environment configuration;
- a small HTTP server and `/health` endpoint;
- structured application logging;
- centralized error handling;
- graceful process shutdown;
- unit/integration tests for bootstrap and HTTP behavior;
- lint, formatting, typecheck, test and build commands;
- a single aggregate quality command;
- GitHub Actions running the same quality contract;
- `.env.example` only for configuration that actually exists;
- no committed credentials or environment-specific production values.

## Target project shape

The exact structure may evolve during implementation, but the intended ownership is roughly:

```text
src/
  app/       # application composition
  config/    # validated runtime configuration
  http/      # server, routes, transport errors
  modules/   # product/domain modules added by consumers
  shared/    # intentionally reusable primitives
tests/
docs/
```

The starter should not create layers merely to match this diagram. A folder only survives if it has a clear responsibility.

## Target developer workflow

A finished V1 should support a flow similar to:

```bash
npm install
npm run dev
npm run check
npm run build
npm start
```

The final package manager and exact commands will be locked during implementation and documented here. The important invariant is that local development and CI execute the same quality contract.

## What will be removed from the old template

The current `main` branch contains a broad dependency set inherited from an older backend project. Packages and code for concerns such as database engines, authentication strategies, mail, browser automation, uploads, sessions or realtime transport will **not** remain simply because they already exist.

They should only return in future example branches/modules when a concrete reusable use case justifies them.

## Non-goals for V1

This starter will not attempt to be:

- a full SaaS boilerplate;
- an authentication framework;
- an ORM/database template;
- a frontend starter;
- a microservice platform;
- a collection of every package I have used before.

Keeping the foundation intentionally small is part of the project contract.

## Implementation sequence

1. Replace stale package metadata and runtime policy.
2. Introduce the minimal TypeScript service foundation.
3. Add validated configuration and health/bootstrap behavior.
4. Add focused tests.
5. Add lint/typecheck/format/build quality gates.
6. Add CI.
7. Remove obsolete legacy code/dependencies.
8. Validate a fresh-clone setup from the final README.

## Contribution rule

Changes should be coherent and independently useful. This repository is also part of a broader engineering-maturity effort, but commit volume is not a goal by itself: every commit should improve the starter's runtime, tests, documentation or developer experience.

## License

The current repository metadata declares ISC. License choice for the modern reusable starter will be reviewed before V1 is marked complete.