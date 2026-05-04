"use client";

import { ChevronsUpDownIcon, FolderIcon, HomeIcon, InboxIcon, SettingsIcon } from "lucide-react";
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
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
      <Demo name="Accordion — single">
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

      <Demo name="Collapsible">
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
        </ScrollArea>
      </Demo>

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

      <Demo name="Sidebar (mini)" span={3} height="tall">
        <div className="h-80 w-full overflow-hidden rounded-[var(--radius)] border border-border">
          <SidebarProvider
            className="h-full min-h-0"
            style={{ "--sidebar-width": "12rem" } as React.CSSProperties}
          >
            <Sidebar collapsible="none" className="border-r border-border">
              <SidebarHeader className="text-sm font-semibold">Acme Inc.</SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Main</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <HomeIcon /> Home
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton isActive>
                          <InboxIcon /> Inbox
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <FolderIcon /> Projects
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <SettingsIcon /> Settings
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <SidebarInset className="flex flex-col">
              <div className="flex items-center gap-2 border-b border-border p-2">
                <SidebarTrigger />
                <span className="text-sm">Main panel</span>
              </div>
              <div className="flex-1 p-4 text-sm text-muted-foreground">
                Content area. Use Sidebar with `collapsible=&quot;icon&quot;` or
                `collapsible=&quot;offcanvas&quot;` in real apps.
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </Demo>
    </Section>
  );
}
