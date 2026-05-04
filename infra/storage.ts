/// <reference path="../.sst/platform/config.d.ts" />

// S3 buckets: assets (public-readable, CDN-fronted) + uploads (private, signed URLs).
// Naming: `{app}-{env}-{purpose}` (shared) or `{app}-dev-{user}-{purpose}` (per-dev).

const stage = $app.stage;

export const assets = new sst.aws.Bucket("Assets", {
  access: "cloudfront",
  cors: [
    {
      allowMethods: ["GET", "HEAD"],
      allowOrigins: ["*"],
      maxAge: "1 day",
    },
  ],
});

export const uploads = new sst.aws.Bucket("Uploads", {
  access: undefined, // private; access via signed URLs
  cors: [
    {
      allowMethods: ["PUT", "POST", "GET", "HEAD"],
      // DOMAIN slot — set production + staging origins when forking template.
      // Keep `<domain>` literal until a real domain is registered.
      allowOrigins:
        stage === "prod"
          ? ["https://app.<domain>"]
          : ["http://localhost:3000", "https://staging.<domain>"],
      allowHeaders: ["*"],
      maxAge: "1 hour",
    },
  ],
  // Lifecycle: tmp uploads expire after 90 days
  // (configure via aws.s3.BucketLifecycleConfigurationV2 once SST exposes it)
});
