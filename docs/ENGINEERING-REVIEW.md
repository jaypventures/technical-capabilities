# Engineering review · Trust, orchestration, and release integrity

## Executive brief

Three small demonstrations explore a single architectural principle: **a system should not advance a consequential state without evidence that the transition is valid**.

| Boundary | Decision | Failure behavior | Proof surface |
| --- | --- | --- | --- |
| External event intake | Authenticate a timestamp-bound message | Reject stale, malformed, or modified input | [Webhook implementation](../examples/webhook-verification/index.js) and [tests](../examples/webhook-verification/index.test.js) |
| Stateful workflow | Admit only permitted transitions; ignore known event IDs | Reject invalid transitions; avoid duplicate processing in a single record | [Workflow implementation](../examples/workflow-engine/index.js) and [tests](../examples/workflow-engine/index.test.js) |
| Release readiness | Require every declared acceptance signal to be explicitly true | Return a non-ready decision with missing evidence | [Release implementation](../examples/release-gate/index.js) and [tests](../examples/release-gate/index.test.js) |

## 1. Event trust boundary

**Problem.** A webhook endpoint receives data from outside its trust boundary. Accepting the payload because it has a familiar JSON shape is insufficient.

**Approach.** The demonstration binds a timestamp and payload into an HMAC-SHA256 digest, compares fixed-length digests with a timing-safe primitive, and rejects messages outside a configured age window.

**Tradeoff.** A time window limits acceptance of stale messages but does **not** prevent replay inside that window. Production integrations need provider-specific signature formats, replay persistence or unique event IDs, secret rotation, transport security, and request-size limits.

**Review questions.** What happens when the body is modified? Is the original raw request body used? How is replay prevention distributed across instances?

## 2. Workflow transition boundary

**Problem.** A workflow can receive events in unexpected order, including repeated delivery.

**Approach.** A transition table enumerates valid edges. A record carries previously processed IDs so a repeated event can return without changing state.

**Tradeoff.** In-memory duplicate tracking demonstrates semantics but is not a transactional guarantee. A production system needs a durable uniqueness constraint, atomic state update, concurrency strategy, and retention policy.

**Review questions.** Can two workers process the same event simultaneously? How are conflicting transitions serialized? What happens after process restart?

## 3. Release acceptance boundary

**Problem.** A release can be approved based on missing or ambiguous signals.

**Approach.** The gate evaluates a declared evidence set and requires an explicit `true` value for each required condition. It reports missing or failing signals.

**Tradeoff.** A boolean gate is a policy demonstration, not a provenance system. Production release admission would bind attestations to exact artifact hashes, trusted issuers, environment, expiry, and approvals.

**Review questions.** Is evidence bound to the artifact being shipped? Can the evidence be forged? Can the release be reversed?

## Cross-cutting engineering judgment

- **Fail closed at trust boundaries:** absent evidence is not evidence of success.
- **Model invalid paths deliberately:** negative tests document what the system must reject.
- **Separate policy from mechanism:** examples are intentionally minimal so decision logic is inspectable.
- **Make limitations visible:** demonstration code is not a production security claim.

## What this portfolio establishes

The repository contains original code and tests that can be inspected and executed locally. It demonstrates engineering reasoning about trust boundaries, state machines, and release gates. It does **not** establish prior customer impact, a deployed service, external validation, or performance at scale.

For independent review, run `npm test` with Node.js 20+.
