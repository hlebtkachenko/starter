/// <reference path="../.sst/platform/config.d.ts" />

// DNS + ACM. Manages ONLY app.<domain> + staging.<domain>.
// Apex <domain> and www.<domain> are managed externally (marketing site).

const stage = $app.stage;
// DOMAIN slot — set the apex domain when forking template (e.g., "starter.io").
// Keep `<domain>` until a real domain is registered; deploy will fail-fast on the
// route53 zone lookup so the unfilled slot can't ship to prod silently.
const rootDomain = "<domain>";

const subdomain = stage === "prod" ? `app.${rootDomain}` : `${stage}.${rootDomain}`;

const zone = aws.route53.getZoneOutput({ name: rootDomain });

export const appCert = new aws.acm.Certificate("AppCert", {
  domainName: subdomain,
  validationMethod: "DNS",
});

const validation = new aws.acm.CertificateValidation("AppCertValidation", {
  certificateArn: appCert.arn,
});

export const appRecord = new aws.route53.Record("AppRecord", {
  zoneId: zone.zoneId,
  name: subdomain,
  type: "A",
  // Alias target attached by web.ts after CloudFront distribution is created.
  // Replace with real `aliases` once web.ts wires through.
  records: ["127.0.0.1"],
  ttl: 60,
});

// Re-export typed FQDN for downstream (web.ts).
export const fqdn = subdomain;
