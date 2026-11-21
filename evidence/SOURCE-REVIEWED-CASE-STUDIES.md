# Engineering casework
### Four problems I worked through—and the decisions behind them

The interesting part of engineering isn't the list of technologies. It's the moment a seemingly reasonable implementation fails a more demanding question.

These accounts are drawn from source code, validation logic, and historical test records I reviewed. I've removed project names, organizations, deployment destinations, provider identifiers, and internal architecture. The descriptions retain the technical decisions and the limits of the evidence. They are not claims that a production launch succeeded.

---

## A passing build was not a release

A release workflow had multiple successful validation steps. That was useful evidence, but it left a critical question unanswered: **was the intended revision actually running where it was supposed to run?**

The release logic distinguished between validating source, admitting a release, executing publication, and confirming the result. The implementation checked for an exact revision identifier and required readback from the serving environment. The deployment path also rejected missing or inconsistent publication requirements.

That separation matters because a passing build can coexist with a failed deployment, a stale serving revision, or an incomplete integration. In this case, archived verification results passed while the broader release evidence remained **blocked**. The correct engineering decision was to preserve that distinction rather than declare success.

**What the evidence supports:** the source contains separate validation and release stages, and the historical record documents passing tests alongside an unresolved release. It does **not** establish a completed deployment or current availability.

**Related public code:** [release admission predicate](../examples/release-gate/index.js) and [negative tests](../examples/release-gate/index.test.js). These are new illustrations, not copies of the original implementation.

---

## When a status indicator became the wrong source of truth

An engineering workflow relied on several layers of verification. A provider's status indicator could describe what had happened in its own environment, but it could not independently establish that every required technical condition had been met.

The source I inspected defined verification as a separate process with explicit commands and acceptance conditions. A dedicated validator also checked for prohibited legacy workflow surfaces. The purpose was not to reject useful hosting tools; it was to prevent a convenient external status from being mistaken for complete engineering evidence.

The practical distinction is subtle: **a check reporting green is information; a release decision requires a defined standard and supporting results.** That distinction becomes especially important when work crosses multiple services or execution environments.

**What the evidence supports:** a documented verification boundary and an executable validator enforcing parts of that boundary. It does **not** prove cross-provider failover or eliminate all external dependencies.

**Related public code:** [readiness assessment](../examples/release-gate/index.js).

---

## A page could look finished and still fail acceptance

A user-facing page can load correctly and still contain broken asset references, placeholder actions, missing image attributes, or structural inconsistencies. Visual approval alone does not expose every defect, and automated checks alone cannot establish design quality.

The reviewed implementation treated those concerns as distinct acceptance conditions. It checked for required document landmarks, image metadata, local asset availability, and prohibited placeholder links. It compared approved assets against recorded hashes and associated visual evidence with the source revision and expected viewport sizes. Release-mode checks also required an explicit review record.

The useful advancement was not simply adding more tests. It was **connecting visual acceptance to a specific source state**, so an earlier approval could not silently stand in for changed content.

**What the evidence supports:** the validator contains these checks and explicit review requirements. It does **not** prove that every page passed, that the visual result was approved, or that accessibility compliance was certified.

**Related public code:** [evidence-bound decision records](../examples/decision-ledger/index.js), a separate illustration of binding decisions to evidence.

---

## An integration was functional in tests, but not proven end to end

An integration had source-level tests covering request validation, error handling, and preservation of an intake record when a downstream delivery step failed. The test suite included a case in which an unconfirmed downstream response was not allowed to advance the recorded delivery state.

That is an important design choice: **an accepted request is not the same as a completed delivery**. Keeping those states separate preserves useful diagnostic evidence and avoids telling a user that an action succeeded when only the first step did.

The historical record also documented a successful compiled-runtime smoke test using a mocked downstream transport. Because the transport was mocked, that result could not prove delivery through the live integration. The broader readiness record remained blocked.

**What the evidence supports:** the archived test record documents failure-path coverage and a mocked runtime check. It does **not** establish successful live delivery, external service availability, or a completed production transaction.

**Related public code:** [workflow state transitions](../examples/workflow-engine/index.js) and [tests](../examples/workflow-engine/index.test.js), illustrating the distinction between permitted state changes and assumed completion.

---

## How to read these cases

The cases describe **observed engineering decisions**, not invented performance statistics. Source inspection and archived test records are evidence of implementation and historical verification—not independent proof of current operations.

The original repositories and records are intentionally not linked or reproduced. Public examples are separately authored teaching artifacts. Where a claim would require live execution, customer evidence, or current readback, I leave it unclaimed.

**The standard I use:** say exactly what the evidence establishes, and no more.
