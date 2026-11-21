# Evidence-bound decision ledger

**Problem.** Operational decisions are often reported without durable context: who made the decision, which evidence was considered, and whether the record changed later.

**Approach.** This synthetic implementation requires an explicit decision, actor, action, and nonempty evidence references. Each entry links to its predecessor using a SHA-256 digest and authenticates its contents using HMAC-SHA256. Verification checks sequence, linkage, content integrity, and message authentication.

**What is demonstrated.** Positive and negative test cases for record construction, chain verification, tampering, missing evidence, wrong keys, and invalid decisions.

**What is not demonstrated.** Durable storage, independent timestamping, external key management, concurrency, authorization, secure key rotation, retention, nonrepudiation, append-only enforcement, or detection of a fully replaced history by a keyholder. A symmetric MAC does not prove who signed an entry. This example is not a production audit log.

**Run:** `npm test` from the repository root. Node.js 20+; no dependencies.

**Engineering principle:** evidence should travel with a consequential decision, not be reconstructed after the fact.
