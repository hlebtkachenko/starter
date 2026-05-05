"use client";

import {
  CheckCircle2Icon,
  CircleAlertIcon,
  InfoIcon,
  TerminalIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Toaster } from "@/components/ui/sonner";
import { Spinner } from "@/components/ui/spinner";

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
  const [progress, setProgress] = useState(13);
  const [controlled, setControlled] = useState([66]);

  useEffect(() => {
    const t = setInterval(() => setProgress((p) => (p >= 100 ? 13 : p + 7)), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <Toaster />

      <Section id="alert" title="Alert" description="Displays a callout for user attention.">
        <Demo name="Basic">
          <Alert>
            <TerminalIcon />
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>You can add components from the registry.</AlertDescription>
          </Alert>
        </Demo>
        <Demo name="Destructive">
          <Alert variant="destructive">
            <TriangleAlertIcon />
            <AlertTitle>Sign-in failed</AlertTitle>
            <AlertDescription>The email or password is incorrect.</AlertDescription>
          </Alert>
        </Demo>
        <Demo name="Action">
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
        <Demo name="Custom colors">
          <Alert className="border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
            <CircleAlertIcon />
            <AlertTitle>Quota near limit</AlertTitle>
            <AlertDescription>You have used 82% of your quota.</AlertDescription>
          </Alert>
        </Demo>
      </Section>

      <Section
        id="progress"
        title="Progress"
        description="Indicator showing the completion progress of a task."
      >
        <Demo name="Default (animated)">
          <div className="w-full">
            <Progress value={progress} />
            <p className="mt-2 text-xs text-muted-foreground">{progress}% (auto-incrementing)</p>
          </div>
        </Demo>
        <Demo name="Label">
          <Field>
            <FieldLabel>Upload</FieldLabel>
            <Progress value={66} />
            <FieldDescription>66% complete</FieldDescription>
          </Field>
        </Demo>
        <Demo name="Controlled (synced with Slider)">
          <div className="w-full space-y-3">
            <Progress value={controlled[0]} />
            <Slider value={controlled} onValueChange={setControlled} max={100} />
          </div>
        </Demo>
      </Section>

      <Section id="sonner" title="Sonner" description="Opinionated toast component.">
        <Demo name="Default">
          <Button onClick={() => toast("Event has been created.")}>Show toast</Button>
        </Demo>
        <Demo name="Success">
          <Button variant="outline" onClick={() => toast.success("Saved.")}>
            Success
          </Button>
        </Demo>
        <Demo name="Info">
          <Button variant="outline" onClick={() => toast.info("Heads up.")}>
            Info
          </Button>
        </Demo>
        <Demo name="Warning">
          <Button variant="outline" onClick={() => toast.warning("Quota near limit.")}>
            Warning
          </Button>
        </Demo>
        <Demo name="Error">
          <Button variant="destructive" onClick={() => toast.error("Failed.")}>
            Error
          </Button>
        </Demo>
        <Demo name="Promise">
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
        <Demo name="Description">
          <Button
            variant="outline"
            onClick={() => toast("Event scheduled.", { description: "Friday, 3:00 PM" })}
          >
            With description
          </Button>
        </Demo>
        <Demo name="Position" span={2}>
          <p className="w-full text-xs text-muted-foreground">Click any position.</p>
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

      <Section
        id="spinner"
        title="Spinner"
        description="Indicator that can be used to show a loading state."
      >
        <Demo name="Default">
          <Spinner />
        </Demo>
        <Demo name="Sizes">
          <Spinner className="size-3" />
          <Spinner className="size-4" />
          <Spinner className="size-6" />
          <Spinner className="size-8" />
        </Demo>
        <Demo name="Button">
          <Button disabled>
            <Spinner /> Loading
          </Button>
          <Button disabled variant="outline">
            <Spinner /> Saving
          </Button>
          <Button disabled variant="secondary">
            <Spinner /> Sending
          </Button>
        </Demo>
        <Demo name="Badge">
          <Badge>
            <Spinner className="size-3" /> Loading
          </Badge>
          <Badge variant="secondary">
            <Spinner className="size-3" /> Generating
          </Badge>
          <Badge variant="outline">
            <Spinner className="size-3" /> Syncing
          </Badge>
        </Demo>
        <Demo name="Input group">
          <InputGroup>
            <InputGroupInput placeholder="Searching..." />
            <InputGroupAddon align="inline-end">
              <Spinner />
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupTextarea placeholder="Generating..." />
            <InputGroupAddon align="block-end">
              <Spinner />
            </InputGroupAddon>
          </InputGroup>
        </Demo>
        <Demo name="Empty (processing state)" span={2}>
          <Empty className="w-full">
            <EmptyHeader>
              <EmptyMedia>
                <Spinner className="size-6" />
              </EmptyMedia>
              <EmptyTitle>Processing</EmptyTitle>
              <EmptyDescription>
                We are crunching the data. This usually takes a few seconds.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <CheckCircle2Icon className="size-4 text-emerald-500" />
              <span>Step 2 of 4 complete</span>
            </EmptyContent>
          </Empty>
        </Demo>
      </Section>
    </>
  );
}
