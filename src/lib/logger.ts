import "server-only";

// pino logger. Pretty in dev, JSON in prod. Request-bound child loggers carry context.

// Stub until pino is installed.
//
// import pino from "pino";
// import { env } from "./env";
//
// export const logger = pino({
//   level: env.NODE_ENV === "production" ? "info" : "debug",
//   redact: {
//     paths: [
//       "password",
//       "token",
//       "secret",
//       "*.password",
//       "*.token",
//       "*.secret",
//       "headers.authorization",
//       "headers.cookie",
//     ],
//     censor: "[redacted]",
//   },
//   transport:
//     env.NODE_ENV === "production"
//       ? undefined
//       : { target: "pino-pretty", options: { colorize: true } },
// });
//
// export type Logger = typeof logger;

// Stub fallbacks until pino is installed. `warn` and `error` route to console
// so security-relevant events are not silently dropped during the scaffold
// phase; `info` and `debug` stay silent to match production noise budget.
const noop = () => {};
export const logger = {
  info: noop,
  debug: noop,
  warn: (...args: unknown[]) => console.warn(...args),
  error: (...args: unknown[]) => console.error(...args),
  child: () => logger,
};
