// RFC 9116: security.txt. Mirrors SECURITY.md at machine-readable shape.
//
// DOMAIN slot — replace `<domain>` (3 sites in body) with the apex domain
//   when forking this template (matches infra/dns.ts, infra/storage.ts, etc).
// REPO slot — `hlebtkachenko/starter` already concrete; change when forking.
const body = `Contact: mailto:security@<domain>
Expires: 2027-01-01T00:00:00.000Z
Preferred-Languages: en
Canonical: https://app.<domain>/.well-known/security.txt
Policy: https://github.com/hlebtkachenko/starter/blob/master/SECURITY.md
`;

export const dynamic = "force-static";

export function GET() {
  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
