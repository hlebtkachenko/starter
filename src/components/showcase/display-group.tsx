"use client";

import {
  BookmarkIcon,
  CheckCircle2Icon,
  GitBranchIcon,
  Loader2Icon,
  MailIcon,
  ShieldCheckIcon,
  SparklesIcon,
  XIcon,
} from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { Demo, Section } from "./section";

export function DisplayGroup() {
  const [progress, setProgress] = useState(13);
  const [controlled, setControlled] = useState(40);

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
      {/* Avatar */}
      <Demo name="Avatar — basic">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>HT</AvatarFallback>
        </Avatar>
      </Demo>

      <Demo name="Avatar — sizes">
        <Avatar className="size-6">
          <AvatarFallback>S</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
        <Avatar className="size-12">
          <AvatarFallback>L</AvatarFallback>
        </Avatar>
        <Avatar className="size-16">
          <AvatarFallback>XL</AvatarFallback>
        </Avatar>
      </Demo>

      <Demo name="Avatar — with badge">
        <div className="relative">
          <Avatar>
            <AvatarFallback>HT</AvatarFallback>
          </Avatar>
          <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-background bg-emerald-500" />
        </div>
        <div className="relative">
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-background bg-amber-500" />
        </div>
        <div className="relative">
          <Avatar>
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-background bg-neutral-400" />
        </div>
      </Demo>

      <Demo name="Avatar — badge with icon">
        <div className="relative">
          <Avatar>
            <AvatarFallback>HT</AvatarFallback>
          </Avatar>
          <span className="absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full border-2 border-background bg-emerald-500 text-white">
            <CheckCircle2Icon className="size-3" />
          </span>
        </div>
      </Demo>

      <Demo name="Avatar — group">
        <div className="flex -space-x-2">
          {["AB", "CD", "EF", "GH"].map((i) => (
            <Avatar key={i} className="ring-2 ring-background">
              <AvatarFallback>{i}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </Demo>

      <Demo name="Avatar — group with count">
        <div className="flex -space-x-2">
          {["AB", "CD", "EF"].map((i) => (
            <Avatar key={i} className="ring-2 ring-background">
              <AvatarFallback>{i}</AvatarFallback>
            </Avatar>
          ))}
          <Avatar className="ring-2 ring-background">
            <AvatarFallback className="text-xs">+12</AvatarFallback>
          </Avatar>
        </div>
      </Demo>

      <Demo name="Avatar — group with icon">
        <div className="flex -space-x-2">
          {["AB", "CD"].map((i) => (
            <Avatar key={i} className="ring-2 ring-background">
              <AvatarFallback>{i}</AvatarFallback>
            </Avatar>
          ))}
          <Avatar className="ring-2 ring-background">
            <AvatarFallback>
              <SparklesIcon className="size-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </Demo>

      <Demo name="Avatar — dropdown trigger">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-9 rounded-full">
              <Avatar>
                <AvatarFallback>HT</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Demo>

      {/* Badge */}
      <Demo name="Badge — variants">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
      </Demo>

      <Demo name="Badge — with icon (Verified)">
        <Badge variant="outline">
          <CheckCircle2Icon /> Verified
        </Badge>
        <Badge>
          <ShieldCheckIcon /> Trusted
        </Badge>
      </Demo>

      <Demo name="Badge — with icon (Bookmark)">
        <Badge variant="secondary">
          <BookmarkIcon /> Bookmarked
        </Badge>
        <Badge variant="outline">
          <GitBranchIcon /> main
        </Badge>
      </Demo>

      <Demo name="Badge — with spinner (Deleting)">
        <Badge variant="destructive">
          <Loader2Icon className="animate-spin" /> Deleting
        </Badge>
      </Demo>

      <Demo name="Badge — with spinner (Generating)">
        <Badge variant="secondary">
          <Loader2Icon className="animate-spin" /> Generating
        </Badge>
      </Demo>

      <Demo name="Badge — link / custom">
        <Badge asChild>
          <a href="#">Link badge</a>
        </Badge>
        <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">Custom green</Badge>
        <Badge className="bg-amber-500 text-white hover:bg-amber-600">Custom amber</Badge>
      </Demo>

      {/* Card */}
      <Demo name="Card — login form">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Sign in to continue.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Email" type="email" />
            <Input placeholder="Password" type="password" />
          </CardContent>
          <CardFooter>
            <Button className="w-full">Sign in</Button>
          </CardFooter>
        </Card>
      </Demo>

      <Demo name="Card — small">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-base">Push notifications</CardTitle>
            <CardDescription>Send to your devices.</CardDescription>
            <CardAction>
              <Button size="sm" variant="outline">
                <MailIcon /> Send
              </Button>
            </CardAction>
          </CardHeader>
        </Card>
      </Demo>

      <Demo name="Card — image cover">
        <Card className="w-full gap-0 overflow-hidden py-0">
          <div className="aspect-video w-full bg-[radial-gradient(circle_at_30%_30%,#dbeafe,transparent_60%),radial-gradient(circle_at_70%_70%,#fde68a,transparent_60%),linear-gradient(135deg,#f5f5f5,#e5e5e5)]" />
          <CardHeader className="py-5">
            <CardTitle>Project Phoenix</CardTitle>
            <CardDescription>Migration to multi-tenant architecture.</CardDescription>
          </CardHeader>
        </Card>
      </Demo>

      {/* Separator */}
      <Demo name="Separator — list">
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

      <Demo name="Separator — vertical">
        <div className="flex h-12 items-center gap-4">
          <span className="text-sm">Inbox</span>
          <Separator orientation="vertical" />
          <span className="text-sm">Drafts</span>
          <Separator orientation="vertical" />
          <span className="text-sm">Sent</span>
        </div>
      </Demo>

      <Demo name="Separator — menu">
        <div className="w-full rounded-[var(--radius)] border border-border bg-popover p-1 text-sm">
          <div className="rounded-md px-2 py-1.5 hover:bg-accent">New</div>
          <div className="rounded-md px-2 py-1.5 hover:bg-accent">Open</div>
          <Separator className="my-1" />
          <div className="rounded-md px-2 py-1.5 hover:bg-accent">Save</div>
          <div className="rounded-md px-2 py-1.5 hover:bg-accent">Save as</div>
        </div>
      </Demo>

      {/* Skeleton */}
      <Demo name="Skeleton — text">
        <div className="w-full space-y-2">
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </Demo>

      <Demo name="Skeleton — avatar">
        <div className="flex w-full items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </Demo>

      <Demo name="Skeleton — card">
        <div className="w-full rounded-[var(--radius)] border border-border p-4">
          <Skeleton className="h-32 w-full rounded-md" />
          <div className="mt-3 space-y-2">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </Demo>

      <Demo name="Skeleton — form">
        <div className="w-full space-y-3">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-9 w-32" />
        </div>
      </Demo>

      <Demo name="Skeleton — table">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2">Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[0, 1, 2].map((i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-3 w-3/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-3 w-12" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="ml-auto h-3 w-16" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Demo>

      {/* Progress */}
      <Demo name="Progress — with label">
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Upload</span>
            <span className="text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
      </Demo>

      <Demo name="Progress — controlled">
        <div className="w-full space-y-3">
          <Progress value={controlled} />
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setControlled((v) => Math.max(0, v - 10))}
            >
              -10
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setControlled((v) => Math.min(100, v + 10))}
            >
              +10
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setControlled(0)}>
              <XIcon /> Reset
            </Button>
          </div>
        </div>
      </Demo>

      {/* Aspect ratio */}
      <Demo name="Aspect ratio — default 16:9">
        <div className="w-full">
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-[var(--radius)] bg-muted">
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              16:9
            </div>
          </AspectRatio>
        </div>
      </Demo>

      <Demo name="Aspect ratio — square">
        <div className="w-full">
          <AspectRatio ratio={1} className="overflow-hidden rounded-[var(--radius)] bg-muted">
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              1:1
            </div>
          </AspectRatio>
        </div>
      </Demo>

      <Demo name="Aspect ratio — portrait">
        <div className="mx-auto w-32">
          <AspectRatio ratio={3 / 4} className="overflow-hidden rounded-[var(--radius)] bg-muted">
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              3:4
            </div>
          </AspectRatio>
        </div>
      </Demo>
    </Section>
  );
}
