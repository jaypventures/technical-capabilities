# Technical review | Four inspectable implementations

Four public code demonstrations illustrate the engineering techniques described in the [case studies](../evidence/SOURCE-REVIEWED-CASE-STUDIES.md). Each implementation has readable source and tests.

| Engineering technique | Implemented behavior | Explore |
| --- | --- | --- |
| **External-event authentication** | Validates timestamp-bound HMAC signatures and rejects malformed or stale events | [Code](../examples/webhook-verification/index.js) · [Tests](../examples/webhook-verification/index.test.js) |
| **Workflow state integrity** | Enforces explicit state transitions and handles repeated event identifiers | [Code](../examples/workflow-engine/index.js) · [Tests](../examples/workflow-engine/index.test.js) |
| **Evidence-based release admission** | Requires declared readiness conditions to be present and satisfied | [Code](../examples/release-gate/index.js) · [Tests](../examples/release-gate/index.test.js) |
| **Evidence-linked decision records** | Hash-chains decisions and authenticates their referenced evidence | [Code](../examples/decision-ledger/index.js) · [Tests](../examples/decision-ledger/index.test.js) |

## What to look for in the code

**Event authentication** — HMAC-SHA256, timestamp freshness, malformed-input rejection, and test cases for both accepted and rejected signatures. Production extension points include durable replay tracking and key rotation.

**Workflow integrity** — defined transitions, event identifiers, duplicate-event handling, and predictable responses to unsupported transitions. Production extension points include persistent storage and concurrency coordination.

**Release admission** — explicit readiness predicates and tests for incomplete evidence. The pattern is designed to be composed with authenticated attestations and revision-specific readback.

**Decision integrity** — required evidence references, linked records, authenticated hashes, and tamper-detection tests. Production extension points include durable audit storage and independent time attestations.

## Run the examples

The examples use Node.js 20+ and have no third-party dependencies.

```bash
npm test
```

[Engineering casework](../evidence/SOURCE-REVIEWED-CASE-STUDIES.md) · [Selected historical verification](../evidence/HISTORICAL-VERIFICATION-RECEIPTS.md)
