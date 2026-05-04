"use client";

import { TerminalIcon } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

import { Demo, Section } from "./section";

export function FeedbackGroup() {
  return (
    <Section id="feedback" title="Feedback" description="Alert (inline) and Sonner (toasts).">
      <Toaster />

      <Demo name="Alert">
        <div className="grid w-full max-w-sm gap-3">
          <Alert>
            <TerminalIcon />
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>You can add components from the registry.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Sign-in failed</AlertTitle>
            <AlertDescription>The email or password is incorrect.</AlertDescription>
          </Alert>
        </div>
      </Demo>

      <Demo name="Toast (Sonner)">
        <Button onClick={() => toast("Event has been created.")}>Show toast</Button>
        <Button
          variant="outline"
          onClick={() => toast.success("Saved.", { description: "All changes synced." })}
        >
          Success
        </Button>
        <Button
          variant="destructive"
          onClick={() => toast.error("Failed.", { description: "Network unreachable." })}
        >
          Error
        </Button>
      </Demo>
    </Section>
  );
}
