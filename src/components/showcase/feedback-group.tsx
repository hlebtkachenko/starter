"use client";

import { CheckCircle2Icon, InfoIcon, TerminalIcon, TriangleAlertIcon } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

import { Demo, Section } from "./section";

const POSITIONS = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
] as const;

export function FeedbackGroup() {
  return (
    <Section
      id="feedback"
      title="Feedback"
      description="Inline alerts and toast notifications via Sonner."
    >
      <Toaster />

      <Demo name="Alert — basic">
        <Alert>
          <TerminalIcon />
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>You can add components from the registry.</AlertDescription>
        </Alert>
      </Demo>

      <Demo name="Alert — destructive">
        <Alert variant="destructive">
          <TriangleAlertIcon />
          <AlertTitle>Sign-in failed</AlertTitle>
          <AlertDescription>The email or password is incorrect.</AlertDescription>
        </Alert>
      </Demo>

      <Demo name="Alert — with action">
        <Alert>
          <InfoIcon />
          <AlertTitle>New version available</AlertTitle>
          <AlertDescription>v3.0 is out with redesigned AI.</AlertDescription>
          <AlertAction>
            <Button size="sm" variant="outline">
              Update
            </Button>
          </AlertAction>
        </Alert>
      </Demo>

      <Demo name="Alert — custom colors">
        <Alert className="border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100">
          <CheckCircle2Icon />
          <AlertTitle>Saved</AlertTitle>
          <AlertDescription>All changes synced.</AlertDescription>
        </Alert>
      </Demo>

      {/* Sonner */}
      <Demo name="Toast — types">
        <Button onClick={() => toast("Event has been created.")}>Default</Button>
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

      <Demo name="Toast — description / action">
        <Button
          variant="outline"
          onClick={() => toast("Event scheduled.", { description: "Friday, 3:00 PM" })}
        >
          With description
        </Button>
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
      </Demo>

      <Demo name="Toast — position" span={2}>
        <p className="w-full text-xs text-muted-foreground">
          Click any position to fire a toast there.
        </p>
        {POSITIONS.map((p) => (
          <Button
            key={p}
            variant="outline"
            size="sm"
            onClick={() => toast(`Position: ${p}`, { position: p })}
          >
            {p}
          </Button>
        ))}
      </Demo>
    </Section>
  );
}
