/**
 * @slug button
 * @variant as-child
 * @upstream https://ui.shadcn.com/docs/components/button#as-child
 * @deviations []
 */
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function ButtonAsChild() {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  );
}
