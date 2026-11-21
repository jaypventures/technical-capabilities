<div align="center">

![Jay Price — Engineering, made inspectable](assets/hero.svg)

# Jay Price
### SYSTEMS ARCHITECTURE · SOFTWARE ENGINEERING · TECHNICAL GOVERNANCE

**I engineer the decisions that make complex systems trustworthy.**

Architecture · Secure integrations · Workflow orchestration · Release integrity

[**Engineering review**](docs/ENGINEERING-REVIEW.md) &nbsp;·&nbsp; [**Evidence matrix**](evidence/INDEX.md) &nbsp;·&nbsp; [**Reviewer guide**](docs/REVIEWER-GUIDE.md)

</div>

---

## The engineering thesis

**A system should not advance a consequential state without evidence that the transition is valid.**

That principle connects three areas of my work: authenticating external events, preserving workflow integrity, and making release decisions traceable. This repository turns those ideas into compact, reviewable implementations rather than relying on a résumé of untestable claims.

I work across **systems architecture, software engineering, security-minded integration, automation, AI integration design, and technical reliability**. My approach connects operational requirements with technical decisions, acceptance criteria, and failure behavior.

## Selected engineering work

| Focus | Engineering decision | Inspect the evidence |
| :--- | :--- | :--- |
| **01 · Establish trust** | Authenticate an incoming event before processing it. Reject tampering, malformed signatures, and stale timestamps. | [Source](examples/webhook-verification/index.js) · [Tests](examples/webhook-verification/index.test.js) · [Threat-boundary analysis](docs/ENGINEERING-REVIEW.md#1-event-trust-boundary) |
| **02 · Preserve state integrity** | Define permissible workflow transitions and avoid repeating an already-recorded event. | [Source](examples/workflow-engine/index.js) · [Tests](examples/workflow-engine/index.test.js) · [Concurrency tradeoffs](docs/ENGINEERING-REVIEW.md#2-workflow-transition-boundary) |
| **03 · Require release evidence** | Treat missing acceptance signals as a failed readiness decision, not implicit approval. | [Source](examples/release-gate/index.js) · [Tests](examples/release-gate/index.test.js) · [Provenance considerations](docs/ENGINEERING-REVIEW.md#3-release-acceptance-boundary) |

### Why these decisions matter

**Trust boundaries.** External input is not trusted merely because it looks valid. Authentication must be verified before downstream processing.

**State machines.** Workflow correctness requires explicit transition rules and a deliberate strategy for repeated or competing events.

**Release admission.** Readiness should be based on inspectable evidence tied to defined criteria—not assumptions or undocumented exceptions.

**Operational integrity.** Failure behavior, observability, reversibility, and reviewability belong in the design, not as afterthoughts.

## Technical range

| Discipline | Where I focus |
| --- | --- |
| **Systems architecture** | Service interfaces, identity boundaries, dependency analysis, environment separation |
| **Software engineering** | Application logic, API contracts, testing, failure handling, maintainable systems |
| **Security engineering** | Signature verification, defensive validation, least exposure, fail-closed decisions |
| **Automation engineering** | Workflow modeling, event handling, repeatable verification |
| **Release engineering** | Readiness criteria, quality gates, change integrity, audit-friendly decisions |
| **AI engineering & integration** | Workflow integration, evaluation design, human-review boundaries |

## Inspect the work

```bash
npm test
```

**Runtime:** Node.js 20+ · **Third-party packages:** none · **External credentials:** none.

[Read the architecture and tradeoffs →](docs/ENGINEERING-REVIEW.md)  
[Trace every demonstrated claim to evidence →](evidence/INDEX.md)  
[Use the five-minute technical review →](docs/REVIEWER-GUIDE.md)

## My operating method

**Purpose → Outcome → Action → Process → Support**

I start with the intended outcome, translate it into technical requirements, define system boundaries, implement against explicit acceptance criteria, and test failure behavior as deliberately as the happy path.

**The standard is not code that merely runs. It is engineering that can withstand inspection.**

---

**Jay Price** · Software Engineer · Systems Architect · Technology Consultant

<sub>Publication integrity: The code in this repository is original, synthetic demonstration material. It illustrates engineering decisions; it is not presented as proof of historical deployments, client outcomes, production hardening, or external certification. Private architectures, business configurations, credentials, and customer information are excluded.</sub>
