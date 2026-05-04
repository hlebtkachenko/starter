"use client";

import { CheckCircle2Icon, InfoIcon, TerminalIcon, TriangleAlertIcon } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

import { Demo, Section } from "./section";

export function FeedbackGroup() {
  return (
    <Section
      id="feedback"
      title="Feedback"
      description="Inline alerts and toast notifications via Sonner."
    >
      <Toaster />

      <Demo name="Alert — info">
        <Alert>
          <TerminalIcon />
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>You can add components from the registry.</AlertDescription>
        </Alert>
      </Demo>

      <Demo name="Alert — success">
        <Alert>
          <CheckCircle2Icon />
          <AlertTitle>Saved</AlertTitle>
          <AlertDescription>Your changes have been synced to the server.</AlertDescription>
        </Alert>
      </Demo>

      <Demo name="Alert — destructive">
        <Alert variant="destructive">
          <TriangleAlertIcon />
          <AlertTitle>Sign-in failed</AlertTitle>
          <AlertDescription>The email or password is incorrect.</AlertDescription>
        </Alert>
      </Demo>

      <Demo name="Alert — title only">
        <Alert>
          <InfoIcon />
          <AlertTitle>Read-only mode is active</AlertTitle>
        </Alert>
      </Demo>

      <Demo name="Toast — basic">
        <Button onClick={() => toast("Event has been created.")}>Show toast</Button>
        <Button
          variant="outline"
          onClick={() => toast("Event scheduled.", { description: "Friday, 3:00 PM" })}
        >
          With description
        </Button>
      </Demo>

      <Demo name="Toast — variants">
        <Button
          variant="outline"
          onClick={() => toast.success("Saved.", { description: "All changes synced." })}
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.info("Heads up.", { description: "Reminder set." })}
        >
          Info
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.warning("Quota near limit.", { description: "82% used." })}
        >
          Warning
        </Button>
        <Button
          variant="destructive"
          onClick={() => toast.error("Failed.", { description: "Network unreachable." })}
        >
          Error
        </Button>
      </Demo>

      <Demo name="Toast — with action / promise">
        <Button
          variant="outline"
          onClick={() =>
            toast("Email archived.", {
              action: { label: "Undo", onClick: () => toast("Restored.") },
            })
          }
        >
          With action
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.promise(new Promise((res) => setTimeout(res, 1500)), {
              loading: "Saving...",
              success: "Saved",
              error: "Failed",
            })
          }
        >
          Promise
        </Button>
      </Demo>
    </Section>
  );
}
