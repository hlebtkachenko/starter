"use client";

import { CheckCircle2Icon, GitBranchIcon, MailIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
      <Demo name="Avatar — image / fallback">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>HT</AvatarFallback>
        </Avatar>
        <Avatar className="size-12">
          <AvatarFallback>XL</AvatarFallback>
        </Avatar>
      </Demo>

      <Demo name="Avatar — stack">
        <div className="flex -space-x-2">
          {["AB", "CD", "EF", "GH"].map((i) => (
            <Avatar key={i} className="ring-2 ring-background">
              <AvatarFallback>{i}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </Demo>

      <Demo name="Badge — variants">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </Demo>

      <Demo name="Badge — with icon, asChild link">
        <Badge variant="outline">
          <CheckCircle2Icon /> Verified
        </Badge>
        <Badge>
          <GitBranchIcon /> main
        </Badge>
        <Badge asChild>
          <a href="#">Link badge</a>
        </Badge>
      </Demo>

      <Demo name="Card — basic">
        <Card className="w-full">
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
            <p className="text-sm">Migration from monolith to multi-tenant. 7 services pending.</p>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">Updated 2h ago</CardFooter>
        </Card>
      </Demo>

      <Demo name="Card — with form">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Subscribe</CardTitle>
            <CardDescription>Get product updates.</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <input
              type="email"
              placeholder="m@example.com"
              className="flex h-9 w-full rounded-[var(--radius)] border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            />
            <Button>
              <MailIcon /> Subscribe
            </Button>
          </CardContent>
        </Card>
      </Demo>

      <Demo name="Separator — horizontal">
        <div className="w-full">
          <p className="text-sm font-medium">Radix Primitives</p>
          <p className="text-xs text-muted-foreground">Unstyled, accessible components.</p>
          <Separator className="my-3" />
          <div className="flex h-5 items-center gap-2 text-xs">
            <span>Blog</span>
            <Separator orientation="vertical" />
            <span>Docs</span>
            <Separator orientation="vertical" />
            <span>Source</span>
          </div>
        </div>
      </Demo>

      <Demo name="Skeleton — list">
        <div className="w-full space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </Demo>

      <Demo name="Progress">
        <div className="w-full space-y-3">
          <Progress value={progress} />
          <p className="text-xs text-muted-foreground">{progress}% complete</p>
          <Progress value={42} />
          <Progress value={100} />
        </div>
      </Demo>

      <Demo name="Aspect ratio — 16:9">
        <div className="w-full">
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-[var(--radius)] bg-muted">
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              16:9
            </div>
          </AspectRatio>
        </div>
      </Demo>

      <Demo name="Aspect ratio — 1:1, 4:3">
        <div className="grid w-full grid-cols-2 gap-2">
          <AspectRatio ratio={1} className="overflow-hidden rounded-[var(--radius)] bg-muted">
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              1:1
            </div>
          </AspectRatio>
          <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-[var(--radius)] bg-muted">
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              4:3
            </div>
          </AspectRatio>
        </div>
      </Demo>
    </Section>
  );
}
