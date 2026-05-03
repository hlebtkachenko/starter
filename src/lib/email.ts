import "server-only";

// Mailbox-keyed transports. Provider-agnostic — SMTP creds resolved from env / Secrets Manager.
// Local dev points at mailpit (no auth, port 1025).

// Stub until nodemailer is installed.
//
// import nodemailer from "nodemailer";
// import { env } from "./env";
//
// type MailboxPurpose = "noreply" | "support" | "admin" | "demo";
//
// const transports: Partial<Record<MailboxPurpose, nodemailer.Transporter>> = {};
//
// export function transport(purpose: MailboxPurpose) {
//   if (transports[purpose]) return transports[purpose]!;
//   const user = env[`SMTP_${purpose.toUpperCase()}_USER` as const];
//   const pass = env[`SMTP_${purpose.toUpperCase()}_PASS` as const];
//   transports[purpose] = nodemailer.createTransport({
//     host: env.SMTP_HOST,
//     port: env.SMTP_PORT,
//     secure: env.SMTP_SECURE,
//     auth: user && pass ? { user, pass } : undefined,
//   });
//   return transports[purpose]!;
// }
//
// export async function sendMail(opts: {
//   from: MailboxPurpose;
//   to: string;
//   subject: string;
//   html: string;
//   text?: string;
// }) {
//   return transport(opts.from).sendMail({
//     from: env[`SMTP_${opts.from.toUpperCase()}_USER` as const],
//     to: opts.to,
//     subject: opts.subject,
//     html: opts.html,
//     text: opts.text,
//   });
// }

export const email = {
  send: async (..._args: unknown[]) => {
    throw new Error("email.send: not yet wired");
  },
};
