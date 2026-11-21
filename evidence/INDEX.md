# Technical evidence matrix

| Capability | Engineering decision | Source | Tests | Boundary |
| --- | --- | --- | --- | --- |
| Event authenticity | Verify a timestamp-bound HMAC before trusting an event | [Source](../examples/webhook-verification/index.js) | [Tests](../examples/webhook-verification/index.test.js) | No durable replay store or provider integration |
| Workflow integrity | Permit explicit state transitions and deduplicate by event ID | [Source](../examples/workflow-engine/index.js) | [Tests](../examples/workflow-engine/index.test.js) | In-memory; no distributed concurrency guarantees |
| Release integrity | Require positive evidence for every readiness condition | [Source](../examples/release-gate/index.js) | [Tests](../examples/release-gate/index.test.js) | Does not deploy or operate CI |

These are original sanitized demonstrations, not proof of private deployments or customer outcomes. Run `npm test` with Node.js 20+.
