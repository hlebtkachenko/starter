"use client";

import {
  ChevronsUpDownIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  PlusIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Demo, Section } from "./section";

const ITEMS = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

export function LayoutGroup() {
  return (
    <>
      <Section
        id="aspect-ratio"
        title="Aspect Ratio"
        description="Displays content within a desired ratio."
      >
        <Demo name="Default (16:9)">
          <AspectRatio
            ratio={16 / 9}
            className="w-full overflow-hidden rounded-[var(--radius)] bg-muted"
          >
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              16:9
            </div>
          </AspectRatio>
        </Demo>
        <Demo name="Square">
          <AspectRatio
            ratio={1}
            className="w-full overflow-hidden rounded-[var(--radius)] bg-muted"
          >
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              1:1
            </div>
          </AspectRatio>
        </Demo>
        <Demo name="Portrait">
          <div className="mx-auto w-32">
            <AspectRatio
              ratio={9 / 16}
              className="overflow-hidden rounded-[var(--radius)] bg-muted"
            >
              <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                9:16
              </div>
            </AspectRatio>
          </div>
        </Demo>
      </Section>

      <Section
        id="card"
        title="Card"
        description="Displays a card with header, content, and footer."
      >
        <Demo name="Default">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>Enter your email below to login to your account</CardDescription>
              <CardAction>
                <Button variant="link" size="sm">
                  Sign Up
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <label htmlFor="card-email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="card-email" type="email" placeholder="m@example.com" />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="card-password" className="text-sm font-medium">
                      Password
                    </label>
                    <a href="#" className="text-sm font-medium underline-offset-4 hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="card-password" type="password" />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </CardFooter>
          </Card>
        </Demo>
        <Demo name="Size (sm)">
          <Card size="sm" className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Small Card</CardTitle>
              <CardDescription>This card uses the small size variant.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                The card component supports a size prop that can be set to &quot;sm&quot; for a more
                compact appearance.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Action
              </Button>
            </CardFooter>
          </Card>
        </Demo>
        <Demo name="Image">
          <Card className="w-full max-w-sm gap-0 overflow-hidden py-0">
            <div className="aspect-video w-full bg-[radial-gradient(circle_at_30%_30%,#dbeafe,transparent_60%),radial-gradient(circle_at_70%_70%,#fde68a,transparent_60%),linear-gradient(135deg,#f5f5f5,#e5e5e5)]" />
            <CardHeader className="py-5">
              <CardTitle>Design systems meetup</CardTitle>
              <CardDescription>
                A practical talk on component APIs, accessibility, and shipping faster.
              </CardDescription>
              <CardAction>
                <Badge variant="secondary">Featured</Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="border-t py-4">
              <Button className="w-full">View Event</Button>
            </CardFooter>
          </Card>
        </Demo>
        <Demo name="With Form">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Subscribe</CardTitle>
              <CardDescription>Get product updates.</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Input type="email" placeholder="m@example.com" />
              <Button>Send</Button>
            </CardContent>
          </Card>
        </Demo>
      </Section>

      <Section
        id="collapsible"
        title="Collapsible"
        description="An interactive component which expands/collapses a panel."
      >
        <Demo name="Basic">
          <Collapsible className="w-full">
            <div className="flex items-center justify-between rounded-[var(--radius)] border border-border px-4 py-3">
              <span className="text-sm font-medium">@hlebtkachenko starred 3 repos</span>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ChevronsUpDownIcon />
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-2 space-y-1 text-sm text-muted-foreground">
              <div className="rounded-[var(--radius)] border border-border px-3 py-2">
                @radix-ui/primitives
              </div>
              <div className="rounded-[var(--radius)] border border-border px-3 py-2">
                @better-auth/core
              </div>
              <div className="rounded-[var(--radius)] border border-border px-3 py-2">
                drizzle-orm
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Demo>
        <Demo name="Settings panel">
          <Collapsible className="w-full" defaultOpen>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between font-medium">
                Advanced settings
                <ChevronsUpDownIcon className="size-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2 rounded-[var(--radius)] border border-border p-3 text-sm">
              <p className="text-muted-foreground">Toggles for power users.</p>
              <p>Experimental flags: 2</p>
              <p>Feature gates: 4</p>
            </CollapsibleContent>
          </Collapsible>
        </Demo>
        <Demo name="File tree">
          <div className="w-full text-sm">
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex w-full items-center gap-1 rounded-md px-2 py-1 hover:bg-accent">
                <FolderIcon className="size-4" /> src
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex w-full items-center gap-1 rounded-md px-2 py-1 hover:bg-accent">
                    <FolderIcon className="size-4" /> components
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-4">
                    <div className="rounded-md px-2 py-1 text-muted-foreground hover:bg-accent">
                      button.tsx
                    </div>
                    <div className="rounded-md px-2 py-1 text-muted-foreground hover:bg-accent">
                      card.tsx
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                <div className="rounded-md px-2 py-1 text-muted-foreground hover:bg-accent">
                  page.tsx
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </Demo>
      </Section>

      <Section
        id="resizable"
        title="Resizable"
        description="Accessible resizable panel groups and layouts with keyboard support."
      >
        <Demo name="Default" span={2}>
          <ResizablePanelGroup
            orientation="horizontal"
            className="h-48 w-full rounded-[var(--radius)] border border-border"
          >
            <ResizablePanel defaultSize={30} className="flex items-center justify-center text-sm">
              One
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={70}>
              <ResizablePanelGroup orientation="vertical">
                <ResizablePanel
                  defaultSize={50}
                  className="flex items-center justify-center text-sm"
                >
                  Two
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel
                  defaultSize={50}
                  className="flex items-center justify-center text-sm"
                >
                  Three
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </Demo>
        <Demo name="Vertical">
          <ResizablePanelGroup
            orientation="vertical"
            className="h-48 w-full rounded-[var(--radius)] border border-border"
          >
            <ResizablePanel defaultSize={50} className="flex items-center justify-center text-sm">
              Top
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} className="flex items-center justify-center text-sm">
              Bottom
            </ResizablePanel>
          </ResizablePanelGroup>
        </Demo>
        <Demo name="Handle (three-pane)">
          <ResizablePanelGroup
            orientation="horizontal"
            className="h-40 w-full rounded-[var(--radius)] border border-border"
          >
            <ResizablePanel defaultSize={25} className="grid place-items-center text-sm">
              Nav
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} className="grid place-items-center text-sm">
              Main
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25} className="grid place-items-center text-sm">
              Aside
            </ResizablePanel>
          </ResizablePanelGroup>
        </Demo>
      </Section>

      <Section
        id="scroll-area"
        title="Scroll Area"
        description="Augments native scroll functionality for cross-browser styling."
      >
        <Demo name="Default (vertical)">
          <ScrollArea className="h-48 w-full rounded-[var(--radius)] border border-border p-3">
            {ITEMS.map((it) => (
              <p key={it} className="py-1 text-sm">
                {it}
              </p>
            ))}
          </ScrollArea>
        </Demo>
        <Demo name="Horizontal">
          <ScrollArea className="w-full whitespace-nowrap rounded-[var(--radius)] border border-border">
            <div className="flex gap-2 p-3">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="flex size-20 shrink-0 items-center justify-center rounded-[var(--radius)] bg-muted text-xs"
                >
                  Card {i + 1}
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Demo>
      </Section>

      <Section
        id="separator"
        title="Separator"
        description="Visually or semantically separates content."
      >
        <Demo name="Default (horizontal)">
          <div className="w-full">
            <p className="text-sm font-medium">Radix Primitives</p>
            <p className="text-xs text-muted-foreground">Unstyled, accessible components.</p>
            <Separator className="my-3" />
            <p className="text-sm">Below the divider.</p>
          </div>
        </Demo>
        <Demo name="Vertical">
          <div className="flex h-12 items-center gap-4">
            <span className="text-sm">Inbox</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Drafts</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Sent</span>
          </div>
        </Demo>
        <Demo name="Menu">
          <div className="w-full rounded-[var(--radius)] border border-border bg-popover p-1 text-sm">
            <div className="rounded-md px-2 py-1.5 hover:bg-accent">New</div>
            <div className="rounded-md px-2 py-1.5 hover:bg-accent">Open</div>
            <Separator className="my-1" />
            <div className="rounded-md px-2 py-1.5 hover:bg-accent">Save</div>
            <div className="rounded-md px-2 py-1.5 hover:bg-accent">Save as</div>
          </div>
        </Demo>
        <Demo name="List">
          <div className="flex h-5 items-center gap-2 text-xs">
            <span>Blog</span>
            <Separator orientation="vertical" />
            <span>Docs</span>
            <Separator orientation="vertical" />
            <span>Source</span>
          </div>
        </Demo>
      </Section>

      <Section
        id="sidebar"
        title="Sidebar"
        description="A composable, themeable and customizable sidebar component."
      >
        <Demo name="Default" span={3} height="tall">
          <SidebarShowcase variant="sidebar" side="left" collapsible="icon" />
        </Demo>
        <Demo name="Offcanvas" span={3} height="tall">
          <SidebarShowcase variant="sidebar" side="left" collapsible="offcanvas" />
        </Demo>
        <Demo name="None" span={3} height="tall">
          <SidebarShowcase variant="sidebar" side="left" collapsible="none" />
        </Demo>
        <Demo name="Floating" span={3} height="tall">
          <SidebarShowcase variant="floating" side="left" collapsible="icon" />
        </Demo>
        <Demo name="Inset" span={3} height="tall">
          <SidebarShowcase variant="inset" side="left" collapsible="icon" />
        </Demo>
        <Demo name="Right" span={3} height="tall">
          <SidebarShowcase variant="sidebar" side="right" collapsible="icon" />
        </Demo>
      </Section>
    </>
  );
}

function SidebarShowcase({
  variant = "sidebar",
  side = "left",
  collapsible = "icon",
}: {
  variant?: "sidebar" | "floating" | "inset";
  side?: "left" | "right";
  collapsible?: "icon" | "offcanvas" | "none";
}) {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-[var(--radius)] border border-border [&_[data-slot=sidebar-container]]:!absolute [&_[data-slot=sidebar-container]]:!h-full [&_[data-slot=sidebar-container]]:!min-h-0">
      <SidebarProvider
        className="h-full min-h-0"
        style={{ "--sidebar-width": "13rem" } as React.CSSProperties}
      >
        <Sidebar collapsible={collapsible} variant={variant} side={side}>
          <SidebarHeader className="text-sm font-semibold">Acme Inc.</SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Home">
                      <HomeIcon />
                      <span>Home</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive tooltip="Inbox">
                      <InboxIcon />
                      <span>Inbox</span>
                    </SidebarMenuButton>
                    <SidebarMenuAction>
                      <PlusIcon className="size-3.5" />
                    </SidebarMenuAction>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Projects">
                      <FolderIcon />
                      <span>Projects</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Settings">
                      <SettingsIcon />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenuButton tooltip="Hleb">
              <UserIcon />
              <span>Hleb</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col">
          <div className="flex items-center gap-2 border-b border-border p-2 text-sm">
            <SidebarTrigger />
            <span className="capitalize">
              {variant} · {side} · {collapsible}
            </span>
          </div>
          <div className="flex-1 p-4 text-sm text-muted-foreground">
            {collapsible === "none"
              ? "Sidebar is fixed; trigger has no effect."
              : collapsible === "offcanvas"
                ? "Click trigger to slide sidebar offscreen."
                : "Click trigger to collapse to icons."}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
