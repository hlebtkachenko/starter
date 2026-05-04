"use client";

import {
  ChevronRightIcon,
  ChevronsUpDownIcon,
  FileTextIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  PlusIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Demo, Section } from "./section";

const ITEMS = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

export function LayoutGroup() {
  const [open, setOpen] = useState(false);

  return (
    <Section
      id="layout"
      title="Layout"
      description="Accordion, collapsible, resizable, scroll area, sidebar."
    >
      {/* Accordion */}
      <Demo name="Accordion — basic">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="a">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. Follows WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>Yes. Tailwind tokens, hex.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="c">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>Yes. CSS variables driven.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Demo>

      <Demo name="Accordion — multiple">
        <Accordion type="multiple" defaultValue={["a"]} className="w-full">
          <AccordionItem value="a">
            <AccordionTrigger>Section one</AccordionTrigger>
            <AccordionContent>Multiple items can be open.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Section two</AccordionTrigger>
            <AccordionContent>Try opening this too.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Demo>

      <Demo name="Accordion — disabled">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="a">
            <AccordionTrigger>Active</AccordionTrigger>
            <AccordionContent>This item works.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b" disabled>
            <AccordionTrigger>Disabled</AccordionTrigger>
            <AccordionContent>Can&apos;t open.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Demo>

      <Demo name="Accordion — borders / card">
        <Accordion
          type="single"
          collapsible
          className="w-full divide-y rounded-[var(--radius)] border border-border"
        >
          {[1, 2, 3].map((i) => (
            <AccordionItem key={i} value={`card-${i}`} className="border-b-0 px-4">
              <AccordionTrigger>Card section {i}</AccordionTrigger>
              <AccordionContent>Body of section {i}.</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Demo>

      {/* Collapsible */}
      <Demo name="Collapsible — basic">
        <Collapsible open={open} onOpenChange={setOpen} className="w-full">
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

      <Demo name="Collapsible — settings panel">
        <Collapsible className="w-full" defaultOpen>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between font-medium">
              Advanced settings
              <ChevronsUpDownIcon className="size-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-2 rounded-[var(--radius)] border border-border p-3 text-sm">
            <p className="text-muted-foreground">Toggles for power users only.</p>
            <p>Experimental flags: 2</p>
            <p>Feature gates: 4</p>
          </CollapsibleContent>
        </Collapsible>
      </Demo>

      <Demo name="Collapsible — file tree">
        <div className="w-full text-sm">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex w-full items-center gap-1 rounded-md px-2 py-1 hover:bg-accent">
              <ChevronRightIcon className="size-3.5 transition-transform data-[state=open]:rotate-90" />
              <FolderIcon className="size-4" /> src
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-4">
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex w-full items-center gap-1 rounded-md px-2 py-1 hover:bg-accent">
                  <ChevronRightIcon className="size-3.5 transition-transform data-[state=open]:rotate-90" />
                  <FolderIcon className="size-4" /> components
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-4">
                  <div className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-accent">
                    <FileTextIcon className="size-4" /> button.tsx
                  </div>
                  <div className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-accent">
                    <FileTextIcon className="size-4" /> card.tsx
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <div className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-accent">
                <FileTextIcon className="size-4" /> page.tsx
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </Demo>

      {/* Scroll area */}
      <Demo name="Scroll area — vertical">
        <ScrollArea className="h-48 w-full rounded-[var(--radius)] border border-border p-3">
          {ITEMS.map((it) => (
            <p key={it} className="py-1 text-sm">
              {it}
            </p>
          ))}
        </ScrollArea>
      </Demo>

      <Demo name="Scroll area — horizontal">
        <div className="w-full overflow-x-auto whitespace-nowrap rounded-[var(--radius)] border border-border">
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
        </div>
      </Demo>

      {/* Resizable */}
      <Demo name="Resizable — horizontal" span={2}>
        <ResizablePanelGroup
          orientation="horizontal"
          className="h-40 w-full rounded-[var(--radius)] border border-border"
        >
          <ResizablePanel defaultSize={30} className="flex items-center justify-center text-sm">
            Left
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={70} className="flex items-center justify-center text-sm">
            Right
          </ResizablePanel>
        </ResizablePanelGroup>
      </Demo>

      <Demo name="Resizable — vertical">
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

      <Demo name="Resizable — three-pane (handle)">
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

      {/* Sidebar */}
      <Demo name="Sidebar — default" span={3} height="tall">
        <div className="relative h-80 w-full overflow-hidden rounded-[var(--radius)] border border-border [&_[data-slot=sidebar-container]]:!absolute [&_[data-slot=sidebar-container]]:!h-full [&_[data-slot=sidebar-container]]:!min-h-0">
          <SidebarProvider
            className="h-full min-h-0"
            style={{ "--sidebar-width": "13rem" } as React.CSSProperties}
          >
            <Sidebar collapsible="icon">
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
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton>Phoenix</SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton>Atlas</SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
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
                Main panel
              </div>
              <div className="flex-1 p-4 text-sm text-muted-foreground">
                Native shadcn{" "}
                <code className="rounded bg-muted px-1">collapsible=&quot;icon&quot;</code>. Default
                uses <code className="rounded bg-muted px-1">position: fixed</code> for full-page
                apps; this demo scopes it to the card via{" "}
                <code className="rounded bg-muted px-1">
                  [data-slot=sidebar-container]:!absolute
                </code>
                .
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </Demo>
    </Section>
  );
}
