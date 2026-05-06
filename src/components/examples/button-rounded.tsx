import { ArrowUpIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ButtonRounded() {
  return (
    <Button variant="outline" size="icon" className="rounded-full">
      <ArrowUpIcon />
    </Button>
  );
}
