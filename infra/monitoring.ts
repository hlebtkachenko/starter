/// <reference path="../.sst/platform/config.d.ts" />

// CloudWatch baseline alarms + SNS topic. See infra/README.md for the alarm matrix.

const stage = $app.stage;

export const alarmTopic = new aws.sns.Topic("AlarmTopic", {
  name: `<project-name>-${stage}-alarms`,
});

// Email subscription: admin mailbox catches infra alerts.
new aws.sns.TopicSubscription("AlarmEmail", {
  topic: alarmTopic.arn,
  protocol: "email",
  endpoint: `admin@<domain>`,
});

// Slack subscription (LATER): wire via AWS ChatBot once Slack workspace is live.

// Lambda baseline (Web)
new aws.cloudwatch.MetricAlarm("WebErrors", {
  alarmName: `<project-name>-${stage}-web-errors`,
  comparisonOperator: "GreaterThanThreshold",
  evaluationPeriods: 5,
  metricName: "Errors",
  namespace: "AWS/Lambda",
  period: 60,
  statistic: "Sum",
  threshold: 10,
  alarmActions: [alarmTopic.arn],
});

new aws.cloudwatch.MetricAlarm("WebP99Latency", {
  alarmName: `<project-name>-${stage}-web-p99`,
  comparisonOperator: "GreaterThanThreshold",
  evaluationPeriods: 5,
  metricName: "Duration",
  namespace: "AWS/Lambda",
  period: 60,
  extendedStatistic: "p99",
  threshold: 1000, // ms
  alarmActions: [alarmTopic.arn],
});

// RDS baseline (CPU + storage): DB cluster identifier injected once db.ts exposes it.
// new aws.cloudwatch.MetricAlarm("DbCpu", { ... });

// pgmq queue-depth alarm placeholder: emit a custom metric from the worker poller, then alarm here.
