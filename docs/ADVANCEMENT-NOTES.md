# Engineering decisions | Public examples

These four public implementations illustrate decisions also discussed in the [anonymized engineering casework](../evidence/SOURCE-REVIEWED-CASE-STUDIES.md). They were written separately for this portfolio and are **not** copies of the underlying work.

**Authenticate before accepting an event.** The [event verification example](../examples/webhook-verification/index.js) checks a timestamp-bound signature. Its [tests](../examples/webhook-verification/index.test.js) include rejected inputs. It does not provide durable replay prevention.

**Make state changes explicit.** The [workflow example](../examples/workflow-engine/index.js) defines permitted transitions and recognizes repeated event identifiers. Its [tests](../examples/workflow-engine/index.test.js) do not establish distributed concurrency safety.

**Treat missing evidence as a failed readiness condition.** The [release example](../examples/release-gate/index.js) requires explicit acceptance results. Its [tests](../examples/release-gate/index.test.js) do not prove the authenticity of external attestations.

**Keep evidence attached to decisions.** The [decision record example](../examples/decision-ledger/index.js) links authenticated entries to their predecessors. Its [tests](../examples/decision-ledger/index.test.js) examine tampering and missing evidence. It is not a durable or independently witnessed audit service.

For documented observations from existing work, read the [case studies](../evidence/SOURCE-REVIEWED-CASE-STUDIES.md) and [historical verification summary](../evidence/HISTORICAL-VERIFICATION-RECEIPTS.md). Neither document claims a current live outcome.
