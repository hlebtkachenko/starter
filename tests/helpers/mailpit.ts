// Query mailpit HTTP API for email assertions in e2e tests.
// Mailpit is provisioned by docker-compose.yml; web UI on :8025, API on :8025/api.

const MAILPIT_API = process.env.MAILPIT_API ?? "http://localhost:8025/api/v1";

export type MailpitMessage = {
  ID: string;
  From: { Address: string; Name?: string };
  To: { Address: string; Name?: string }[];
  Subject: string;
  Created: string;
  Snippet: string;
};

export async function listMessages(): Promise<MailpitMessage[]> {
  const res = await fetch(`${MAILPIT_API}/messages`);
  if (!res.ok) throw new Error(`mailpit list failed: ${res.status}`);
  const json = (await res.json()) as { messages: MailpitMessage[] };
  return json.messages;
}

export async function findMessageTo(
  email: string,
  subjectIncludes?: string,
): Promise<MailpitMessage | null> {
  const messages = await listMessages();
  return (
    messages.find(
      (m) =>
        m.To.some((t) => t.Address === email) &&
        (subjectIncludes ? m.Subject.includes(subjectIncludes) : true),
    ) ?? null
  );
}

export async function getMessageBody(
  id: string,
): Promise<{ html?: string; text?: string }> {
  const res = await fetch(`${MAILPIT_API}/message/${id}`);
  if (!res.ok) throw new Error(`mailpit get failed: ${res.status}`);
  const json = (await res.json()) as { HTML?: string; Text?: string };
  return { html: json.HTML, text: json.Text };
}

export async function purgeMailpit(): Promise<void> {
  await fetch(`${MAILPIT_API}/messages`, { method: "DELETE" });
}
