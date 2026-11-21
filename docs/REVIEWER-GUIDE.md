# Technical reviewer guide

Start with the [engineering casework](../evidence/SOURCE-REVIEWED-CASE-STUDIES.md). Each account describes a concrete failure mode, the implementation decision observed in existing source, and the limits of what was established.

Next, read the [historical verification summary](../evidence/HISTORICAL-VERIFICATION-RECEIPTS.md). It distinguishes recorded passing checks from unresolved release conditions. The underlying archived records are not public, so the historical results cannot be reproduced from this repository.

To examine the engineering techniques independently, inspect the four [public implementations](ENGINEERING-REVIEW.md) and run:

```bash
npm test
```

Node.js 20+ is required. No credentials or external dependencies are needed.

**Review the distinctions:** historical casework versus newly authored examples; source verification versus live operation; explicit failure behavior versus implied success. No customer information, private implementation, or identifying operational configuration is included.
