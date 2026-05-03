/// <reference path="./.sst/platform/config.d.ts" />

// SST entry. Stages: per-dev (`<user>`), `staging`, `prod`.
// Resources defined in infra/* — composed here.

export default $config({
  app(input) {
    const stage = input?.stage ?? "dev";
    return {
      name: "<project-name>",
      removal: stage === "prod" ? "retain" : "remove",
      protect: stage === "prod",
      home: "aws",
      providers: {
        aws: {
          region: process.env.AWS_REGION ?? "<aws-region>",
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
