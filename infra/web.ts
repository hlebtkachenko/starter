/// <reference path="../.sst/platform/config.d.ts" />

// Web app: SST Nextjs construct (Lambda primary; container fallback if Node 24 unavailable).
// Domain: per-stage subdomain; CloudFront default; ACM cert via dns.ts.

import * as secrets from "./secrets";
import * as db from "./db";
import * as storage from "./storage";
import * as dns from "./dns";

const stage = $app.stage;

export const app = new sst.aws.Nextjs("Web", {
  domain: {
    name: dns.appRecord.fqdn,
    dns: false, // dns.ts manages records
    cert: dns.appCert.arn,
  },
  link: [
    db.cluster,
    storage.assets,
    storage.uploads,
    secrets.databaseUrl,
    secrets.betterAuthSecret,
    secrets.smtpNoreply,
    secrets.smtpSupport,
    secrets.smtpAdmin,
    secrets.smtpDemo,
    secrets.sentryDsn,
    secrets.stripeApiKey,
    secrets.stripeWebhookSecret,
  ],
  environment: {
    NEXT_PUBLIC_APP_URL: `https://${dns.appRecord.fqdn}`,
    NODE_ENV: stage === "prod" ? "production" : "development",
  },
  buildCommand: "pnpm build",
  warm: stage === "prod" ? 5 : 0,
});

// Container fallback (commented; uncomment if Lambda Node 24 not GA in region):
//
// export const appContainer = new sst.aws.Service("WebContainer", {
//   cluster: { ... },
//   image: { context: ".", dockerfile: "Dockerfile" },
//   loadBalancer: { domain: dns.appRecord.fqdn, ports: [{ listen: "443/https", forward: "3000/http" }] },
// });
