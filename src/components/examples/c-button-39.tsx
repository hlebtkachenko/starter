import { Badge } from "@/components/ui/reui-badge";

import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";

export default function ButtonUnreadBadge() {
  return (
    <Button variant="outline" className="relative gap-2" aria-label="Inbox (8 unread)">
      <MailIcon aria-hidden="true" />
      Inbox
      <Badge
        variant="destructive"
        size="sm"
        className="absolute -top-1.5 -right-2 rounded-full px-1"
        aria-hidden="true"
      >
        8
      </Badge>
    </Button>
  );
}
