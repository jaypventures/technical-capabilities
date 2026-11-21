# Selected engineering work · Source-reviewed case studies

**Jay Price | Systems architecture, software engineering, technical governance**

These are **reviews of existing engineering artifacts**, not newly invented project stories. The source material was inspected in an accessible engineering repository on **21 November 2026**. The underlying repository may be private or contain sensitive implementation details, so this public document does not copy its source, publish internal identifiers, or imply permission to disclose its topology.

## 01 — Separating source verification from production acceptance

**Engineering problem.** A successful lint run, test suite, merge, or staging operation does not establish that the intended software is serving in production.

**Observed implementation.** A documented release workflow separates repository-native validation from the production operator. Its release guide defines a completion condition requiring the intended revision identifier and successful live route readback. A separate release script records the status of individual validation steps and blocks progress on failure.

**Why it matters.** This distinguishes *code correctness*, *release eligibility*, *deployment execution*, and *observed production state*—four states that are often incorrectly collapsed into one.

**Source evidence inspected.** Deployment guide; native verification pipeline guide; production release operator; deployment operator.

**Public demonstration.** [Release evidence gate](../examples/release-gate/index.js) · [tests](../examples/release-gate/index.test.js).

**What is verified.** The documented separation and corresponding implementation logic exist in the reviewed source.

**What is not verified.** A completed production release, current live availability, a measured reduction in incidents, or a particular customer outcome.

---

## 02 — Provider-independent engineering verification

**Engineering problem.** Source-hosting status indicators can be mistaken for independent evidence that a change is safe or operationally complete.

**Observed implementation.** The inspected pipeline documents repository-native verification commands, exact-revision checks, and a distinction between provider check status and independent acceptance. A dedicated boundary validator rejects retired workflow surfaces and requires an explicit authority contract.

**Why it matters.** It reduces ambiguity about which system produces evidence and which system merely displays status. The design makes verification requirements inspectable outside a particular provider's workflow UI.

**Source evidence inspected.** Native verification pipeline guide; provider-boundary validator.

**Public demonstration.** [Evidence-led release decision](../examples/release-gate/index.js) · [tests](../examples/release-gate/index.test.js).

**What is verified.** The reviewed documentation and validator encode these architectural boundaries.

**What is not verified.** Independent operational resilience across providers, production failover, or the absence of all external dependencies.

---

## 03 — Visual and publication acceptance as testable engineering requirements

**Engineering problem.** A page can render while still violating accessibility conventions, approved content boundaries, or release requirements.

**Observed implementation.** A design-standards validator inspects retained routes for document structure, required shell markers, image attributes, missing local assets, and placeholder actions. It also checks hashes of approved assets and associates visual evidence with source content and required viewport widths. A separate design-governance validator requires explicit review evidence for release mode.

**Why it matters.** It treats user-facing quality and publication eligibility as requirements that can be checked rather than subjective assertions made after deployment.

**Source evidence inspected.** Design-standards validator; design-governance validator.

**Public demonstration.** [Evidence-bound decision history](../examples/decision-ledger/index.js) · [tests](../examples/decision-ledger/index.test.js). This is a conceptual demonstration, **not a reproduction** of the private validator.

**What is verified.** The reviewed scripts contain these validation checks and release-review requirements.

**What is not verified.** That every route passes, that visual quality has been approved, that accessibility compliance has been certified, or that publication succeeded.

---

## 04 — Explicit readiness boundaries for commercial functionality

**Engineering problem.** Publication readiness and transactional readiness are different conditions; treating them as interchangeable can mislead operators and users.

**Observed implementation.** The inspected deployment operator checks publication-readiness state separately from commercial-readiness state. When commercial readiness is not fully verified, it emits a warning rather than claiming that checkout and fulfillment are certified.

**Why it matters.** It makes a consequential distinction visible in the release process: **a published interface does not prove an end-to-end commercial transaction works**.

**Source evidence inspected.** Production deployment operator and publication readiness checks.

**What is verified.** The distinction is encoded in the reviewed implementation.

**What is not verified.** Working payment processing, fulfillment, transaction volume, or revenue.

---

## Review method and claim boundaries

The findings above are based on direct inspection of source text, not on execution of the underlying private project or an independent audit. The public examples in this repository are original, sanitized demonstrations that illustrate related engineering techniques. They are **not** extracted copies of the reviewed source and do not prove the historical implementation's operational outcomes.

**Evidence promotion rule:** publish measurable results only with an approved, reproducible receipt and an explicit scope. Never substitute a code snippet, an attractive diagram, or a source filename for a verified operational result.

**A useful engineering question is not just “what was built?” It is “what decision did the implementation enforce, what failure did it prevent, and how can a reviewer verify the claim?”**
