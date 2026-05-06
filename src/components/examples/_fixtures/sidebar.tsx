"use client";

import * as React from "react";
import { FolderIcon, HomeIcon, InboxIcon, PlusIcon, SettingsIcon, UserIcon } from "lucide-react";

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

export function SidebarShowcase({
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
