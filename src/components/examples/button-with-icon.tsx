/**
 * @slug button
 * @variant with-icon
 * @upstream https://ui.shadcn.com/docs/components/button#with-icon
 * @deviations ["Replaced @tabler/icons-react IconGitBranch with lucide-react GitBranchIcon per project iconLibrary rule."]
 */
import { GitBranchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ButtonWithIcon() {
  return (
    <Button variant="outline" size="sm">
      <GitBranchIcon /> New Branch
    </Button>
  );
}
