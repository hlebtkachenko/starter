/**
 * @slug mention
 * @variant default
 * @upstream https://www.diceui.com/docs/components/radix/mention
 * @deviations ["Token classes replace hardcoded palette."]
 */

import { Mention, MentionContent, MentionInput, MentionItem } from "@/components/ui/mention";

const USERS = [
  { id: "alice", label: "Alice Johnson" },
  { id: "bob", label: "Bob Smith" },
  { id: "carol", label: "Carol Lee" },
  { id: "dan", label: "Dan Park" },
];

export default function MentionDefault() {
  return (
    <div className="w-full max-w-md">
      <Mention>
        <MentionInput placeholder="Type @ to mention someone..." />
        <MentionContent>
          {USERS.map((user) => (
            <MentionItem key={user.id} value={user.label}>
              {user.label}
            </MentionItem>
          ))}
        </MentionContent>
      </Mention>
    </div>
  );
}
