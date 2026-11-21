# Technical review | Four inspectable implementations

The [engineering casework](../evidence/SOURCE-REVIEWED-CASE-STUDIES.md) describes specific situations observed in existing source and historical verification records. The four implementations below are **separately authored public examples**. They make the underlying technical decisions easy to examine without reproducing the original code.

| Decision | What the example does | What it does not prove |
| --- | --- | --- |
| Authenticate an incoming event | Checks timestamp-bound HMAC authentication and rejects malformed or stale input | Durable replay prevention or a live integration |
| Preserve workflow state | Permits defined transitions and recognizes repeated event IDs | Atomic updates across multiple processes |
| Require release evidence | Rejects missing or failing readiness conditions | Trusted attestations or successful deployment |
| Bind decisions to evidence | Chains and authenticates decision records | Durable audit storage, independent timestamps, or nonrepudiation |

## Event authentication

The [implementation](../examples/webhook-verification/index.js) binds a timestamp to message content using HMAC-SHA256. Its [tests](../examples/webhook-verification/index.test.js) examine valid and rejected inputs. A freshness window does not prevent replay inside that window. A real integration would also need durable event tracking, key rotation, transport protections, and a defined signing protocol.

## Workflow state

The [implementation](../examples/workflow-engine/index.js) uses explicit transition rules and event identifiers. Its [tests](../examples/workflow-engine/index.test.js) examine permitted and rejected changes. In-memory state is useful for explaining the rule, not for proving concurrency safety or persistence.

## Release admission

The [implementation](../examples/release-gate/index.js) requires each readiness condition to be explicitly satisfied. Its [tests](../examples/release-gate/index.test.js) exercise missing and failed conditions. A boolean readiness check is not proof that evidence is authentic, bound to the correct revision, or sufficient for publication.

## Evidence-bound decisions

The [implementation](../examples/decision-ledger/index.js) requires evidence references and explicit decisions, then links and authenticates records. Its [tests](../examples/decision-ledger/index.test.js) cover tampering, missing evidence, and incorrect keys. See the [design notes](../examples/decision-ledger/README.md) for limitations. A symmetric authentication key does not establish independent authorship, and an in-memory chain is not a durable audit service.

## The distinction that matters

The [case studies](../evidence/SOURCE-REVIEWED-CASE-STUDIES.md) describe observed engineering work. The [historical verification summary](../evidence/HISTORICAL-VERIFICATION-RECEIPTS.md) reports results from archived records. The public examples demonstrate related techniques. **None of those evidence types should be substituted for another.**

Run `npm test` with Node.js 20+ to inspect the public examples. Their execution does not independently validate the historical work.
