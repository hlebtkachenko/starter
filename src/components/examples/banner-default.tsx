/**
 * @slug banner
 * @variant default
 * @upstream https://www.diceui.com/docs/components/radix/banner
 * @deviations ["Token classes replace hardcoded palette."]
 */
"use client";

import { InfoIcon } from "lucide-react";
import * as React from "react";

import {
  Banner,
  BannerActions,
  BannerClose,
  BannerContent,
  BannerDescription,
  BannerIcon,
  BannerTitle,
} from "@/components/ui/banner";
import { Button } from "@/components/ui/button";

export default function BannerDefault() {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="w-full space-y-4">
      {!open && (
        <Button variant="outline" onClick={() => setOpen(true)}>
          Show banner
        </Button>
      )}
      <Banner variant="info" open={open} onOpenChange={setOpen}>
        <BannerIcon>
          <InfoIcon />
        </BannerIcon>
        <BannerContent>
          <BannerTitle>New version available</BannerTitle>
          <BannerDescription>
            Version 2.0 includes performance improvements and new features.
          </BannerDescription>
        </BannerContent>
        <BannerActions>
          <Button variant="outline" size="sm">
            Learn more
          </Button>
        </BannerActions>
        <BannerClose />
      </Banner>
    </div>
  );
}
