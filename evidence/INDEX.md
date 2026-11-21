# Evidence guide

| Material | What it establishes | Limitation |
| --- | --- | --- |
| [Engineering casework](SOURCE-REVIEWED-CASE-STUDIES.md) | Four specific engineering decisions observed in existing source | Original source remains undisclosed; current operations not independently verified |
| [Historical verification summary](HISTORICAL-VERIFICATION-RECEIPTS.md) | Results recorded in archived verification artifacts | Not a new test run or live readback |
| [Event authentication example](../examples/webhook-verification/index.js) · [tests](../examples/webhook-verification/index.test.js) | Inspectable signature-validation behavior | No durable replay protection |
| [Workflow state example](../examples/workflow-engine/index.js) · [tests](../examples/workflow-engine/index.test.js) | Inspectable transition and duplicate-event behavior | In-memory only |
| [Release admission example](../examples/release-gate/index.js) · [tests](../examples/release-gate/index.test.js) | Inspectable fail-closed readiness checks | Does not authenticate evidence or deploy software |
| [Decision record example](../examples/decision-ledger/index.js) · [tests](../examples/decision-ledger/index.test.js) | Inspectable authenticated hash chain | Not a durable audit service |

The public code is independently authored for this portfolio. It is not presented as source extracted from the historical cases.
