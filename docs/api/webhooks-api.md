# Webhooks API

> Inbound webhooks (Stripe today; Better Auth events optional) and outbound webhooks (LATER) we send to customers.

## Inbound

### Stripe

- Endpoint: `POST /api/webhooks/stripe`.
- Verification: HMAC-SHA256 via `Stripe-Signature` header. Secret from AWS Secrets Manager.
- Routing: route handler verifies signature, then dispatches event to `src/features/billing/webhooks.ts` event router.
- Idempotency: Stripe `event.id` recorded in `stripe_events` table; replay returns 200 without side effects.
- Retry: Stripe retries with exponential backoff up to 3 days. Our handler is **idempotent** to make this safe.
- Timeouts: respond within 5s with 2xx; expensive work goes onto pgmq.

#### Events handled

| Event | Action |
|---|---|
| `customer.subscription.created` | Provision entitlements |
| `customer.subscription.updated` | Update entitlements |
| `customer.subscription.deleted` | Revoke entitlements; schedule purge |
| `invoice.payment_succeeded` | Mark sub current; receipt email |
| `invoice.payment_failed` | Notify org admin; flag past_due |
| `checkout.session.completed` | Link Stripe customer to org |

Unhandled events return 200 (Stripe records ack); we log and skip.

## Outbound (LATER)

When a customer needs notifications back:

- Subscriptions stored in `webhook_subscriptions` table (planned).
- Events: `org.member.added`, `org.member.removed`, `<feature>.<event>`.
- Payload: JSON `{ id, type, created_at, data }`.
- Signing: HMAC-SHA256 with per-subscription secret; header `<App>-Signature: t=<unix>,v1=<hex>`.
- Replay protection: 5-minute timestamp tolerance.
- Delivery: at-least-once with exponential backoff (1m, 5m, 30m, 2h, 12h, 1d, 2d). Dead-letter after 7 days.
- Endpoint: customer-supplied HTTPS URL.

## Errors

Failed inbound verification returns:

```json
{ "error": { "code": "billing.webhook_signature_invalid", "message": "Invalid signature" } }
```

Status `400`.
