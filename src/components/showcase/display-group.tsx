"use client";

import { useEffect, useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import { Demo, Section } from "./section";

export function DisplayGroup() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const t = setInterval(() => setProgress((p) => (p >= 100 ? 13 : p + 7)), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <Section
      id="display"
      title="Display"
      description="Avatars, badges, cards, separators, skeletons, progress, aspect ratio."
    >
      <Demo name="Avatar">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>HT</AvatarFallback>
        </Avatar>
      </Demo>

      <Demo name="Badge">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </Demo>

      <Demo name="Card">
        <Card className="w-[320px]">
          <CardHeader>
            <CardTitle>Project Phoenix</CardTitle>
            <CardDescription>Status: in review</CardDescription>
            <CardAction>
              <Button size="sm" variant="outline">
                Open
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Migration from monolith to multi-tenant. 7 services pending cut over.
            </p>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">Updated 2 hours ago</CardFooter>
        </Card>
      </Demo>

      <Demo name="Separator">
        <div className="flex h-12 items-center gap-4">
          <span>Inbox</span>
          <Separator orientation="vertical" />
          <span>Drafts</span>
          <Separator orientation="vertical" />
          <span>Sent</span>
        </div>
      </Demo>

      <Demo name="Skeleton">
        <div className="flex w-full max-w-sm items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </Demo>

      <Demo name="Progress">
        <div className="w-full max-w-sm">
          <Progress value={progress} />
          <p className="mt-2 text-xs text-muted-foreground">{progress}%</p>
        </div>
      </Demo>

      <Demo name="Aspect ratio">
        <div className="w-[280px]">
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-[var(--radius)] bg-muted">
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              16:9
            </div>
          </AspectRatio>
        </div>
      </Demo>
    </Section>
  );
}
