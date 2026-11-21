# Reviewer guide

**For engineering leaders and technical reviewers.** This repository is deliberately small. It is designed to expose decisions, not hide them behind an elaborate framework.

## Five-minute review

1. Read the [engineering review](ENGINEERING-REVIEW.md) for the problem, decision, and tradeoffs.
2. Inspect the [evidence matrix](../evidence/INDEX.md) to connect each capability to source and tests.
3. Run `npm test` with Node.js 20+.
4. Examine negative test cases and the explicitly documented production gaps.

## What to evaluate

- Whether failure behavior is deliberate rather than incidental.
- Whether acceptance criteria can be inspected independently.
- Whether boundaries between a minimal demonstration and production architecture are stated accurately.
- Whether the implementation is understandable without proprietary dependencies.

## What is intentionally excluded

Customer names, internal business topology, production credentials, private application code, unsupported adoption metrics, and claims of independent certification.

## Future evidence standard

A verified accomplishment should include a sanitized technical artifact, the precise engineering problem, a reproducible verification method, and a result supported by an approved source. Historical outcomes will not be inferred from new sample code.
