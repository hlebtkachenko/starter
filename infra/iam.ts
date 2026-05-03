/// <reference path="../.sst/platform/config.d.ts" />

// GitHub OIDC trust + deploy role. No static AWS keys in CI.
// `sub` claim scopes role assumption to this repo + ref pattern.

const repo = "<git-user>/<repo>";

const oidcProvider = new aws.iam.OpenIdConnectProvider("GitHubOidc", {
  url: "https://token.actions.githubusercontent.com",
  clientIdLists: ["sts.amazonaws.com"],
  thumbprintLists: ["6938fd4d98bab03faadb97b34396831e3780aea1"], // GitHub OIDC thumbprint
});

const trustPolicy = aws.iam.getPolicyDocumentOutput({
  statements: [
    {
      effect: "Allow",
      principals: [{ type: "Federated", identifiers: [oidcProvider.arn] }],
      actions: ["sts:AssumeRoleWithWebIdentity"],
      conditions: [
        {
          test: "StringEquals",
          variable: "token.actions.githubusercontent.com:aud",
          values: ["sts.amazonaws.com"],
        },
        {
          test: "StringLike",
          variable: "token.actions.githubusercontent.com:sub",
          // master for prod; any branch for staging — split if blast radius requires
          values: [
            `repo:${repo}:ref:refs/heads/master`,
            `repo:${repo}:pull_request`,
          ],
        },
      ],
    },
  ],
});

export const role = new aws.iam.Role("GitHubDeployRole", {
  name: "GitHubDeployRole",
  assumeRolePolicy: trustPolicy.json,
});

// Broad SST-deploy permissions; tighten per-environment when stable.
new aws.iam.RolePolicyAttachment("GitHubDeployAdmin", {
  role: role.name,
  policyArn: "arn:aws:iam::aws:policy/AdministratorAccess",
});
