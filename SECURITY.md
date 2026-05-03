# Security policy

## Reporting a vulnerability

Email **security@<domain>** with:

- Affected component / URL
- Reproduction steps
- Impact assessment
- Your contact (for follow-up + credit if desired)

Do **not** open a public GitHub issue for security findings.

## Response SLA

- Initial acknowledgement: **within 7 days**.
- Triage + severity classification: **within 14 days**.
- Fix or mitigation plan: communicated within triage window.

## Disclosure policy

Coordinated disclosure. Public write-up after fix is deployed and at least one full backup cycle has rotated. We credit reporters by name unless anonymity is requested.

No public proof-of-concept exploits before fix is shipped.

## Scope

**In scope**

- Production endpoints under `app.<domain>` and `*.app.<domain>`.
- Auth flows (login, signup, MFA, session, org invitation).
- Billing flows (Stripe webhook handling, plan upgrades).
- Data isolation between tenants (RLS bypass).

**Out of scope**

- Third-party providers (Stripe, AWS, Sentry, SMTP): report directly to vendor.
- Findings against `staging.<domain>` (use scope only as testbed; production findings preferred).
- DoS, volumetric attacks.
- Social engineering of staff.
- Findings requiring physical access or rooted devices.

## Bug bounty

No paid bounty program at this time. We acknowledge reporters publicly (with consent) on a security-acks page once the program is formalized.

## Vuln disclosure standard

`/.well-known/security.txt` mirrors this policy at machine-readable shape (RFC 9116). See [`src/app/.well-known/security.txt/route.ts`](src/app/.well-known/security.txt/route.ts).
