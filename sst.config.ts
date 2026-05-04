/// <reference path="./.sst/platform/config.d.ts" />

// SST entry. Stages: per-dev (`<user>`), `staging`, `prod`.
// Resources defined in infra/*: composed here.

export default $config({
  app(input) {
    const stage = input?.stage ?? "dev";
    return {
      name: "starter", // PROJECT NAME slot — change when forking this template
      removal: stage === "prod" ? "retain" : "remove",
      protect: stage === "prod",
      home: "aws",
      providers: {
        aws: {
          // AWS REGION slot — eu-central-1 per GDPR + CLAUDE.md EU preference; change when forking
          region: process.env.AWS_REGION ?? "eu-central-1",
        },
      },
    };
  },

  async run() {
    const iam = await import("./infra/iam");
    const secrets = await import("./infra/secrets");
    const storage = await import("./infra/storage");
    const dns = await import("./infra/dns");
    const db = await import("./infra/db");
    const web = await import("./infra/web");
    const monitoring = await import("./infra/monitoring");

    return {
      role: iam.role.arn,
      bucket_assets: storage.assets.name,
      bucket_uploads: storage.uploads.name,
      db_endpoint: db.cluster.host,
      web_url: web.app.url,
      alarm_topic: monitoring.alarmTopic.arn,
      domain: dns.appRecord.fqdn,
    };
  },
});
