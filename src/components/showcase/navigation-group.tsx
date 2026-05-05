"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotIcon,
  MailIcon,
  SettingsIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Demo, Section } from "./section";

export function NavigationGroup() {
  const [page, setPage] = useState(2);

  return (
    <>
      <Section
        id="breadcrumb"
        title="Breadcrumb"
        description="Displays the path to the current resource using a hierarchy of links."
      >
        <Demo name="Basic">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Showcase</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Demo>
        <Demo name="Custom separator">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <DotIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Docs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <DotIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Page</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Demo>
        <Demo name="Dropdown">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    Components
                    <ChevronRightIcon className="size-3.5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>UI</DropdownMenuItem>
                    <DropdownMenuItem>Forms</DropdownMenuItem>
                    <DropdownMenuItem>Charts</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Showcase</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Demo>
        <Demo name="Collapsed (ellipsis)">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Settings</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Demo>
        <Demo name="Link Component (asChild)">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <a href="#home">Home</a>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Item</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Demo>
      </Section>

      <Section
        id="menubar"
        title="Menubar"
        description="A visually persistent menu common in desktop applications."
      >
        <Demo name="Default" span={2}>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Open <MenubarShortcut>⌘O</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  Save <MenubarShortcut>⌘S</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </Demo>
        <Demo name="Checkbox">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarCheckboxItem checked>Auto-save</MenubarCheckboxItem>
                <MenubarCheckboxItem>Word wrap</MenubarCheckboxItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </Demo>
        <Demo name="Radio">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Density</MenubarTrigger>
              <MenubarContent>
                <MenubarRadioGroup value="comfortable">
                  <MenubarRadioItem value="compact">Compact</MenubarRadioItem>
                  <MenubarRadioItem value="comfortable">Comfortable</MenubarRadioItem>
                  <MenubarRadioItem value="cozy">Cozy</MenubarRadioItem>
                </MenubarRadioGroup>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </Demo>
        <Demo name="Submenu">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New</MenubarItem>
                <MenubarSub>
                  <MenubarSubTrigger>Recent</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>project-a.ts</MenubarItem>
                    <MenubarItem>project-b.ts</MenubarItem>
                    <MenubarItem>project-c.ts</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>Save</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </Demo>
        <Demo name="With icons (destructive)">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Account</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <UserIcon /> Profile
                </MenubarItem>
                <MenubarItem>
                  <SettingsIcon /> Settings
                </MenubarItem>
                <MenubarItem>
                  <MailIcon /> Inbox
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem variant="destructive">
                  <TrashIcon /> Delete account
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </Demo>
      </Section>

      <Section
        id="navigation-menu"
        title="Navigation Menu"
        description="A collection of links for navigating websites."
      >
        <Demo name="Default" span={2} height="tall">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-72 gap-1 p-3">
                    {[
                      { label: "Auth", desc: "Better Auth integration." },
                      { label: "Billing", desc: "Stripe-powered subs." },
                      { label: "Database", desc: "PostgreSQL with RLS." },
                      { label: "Storage", desc: "S3-compatible blobs." },
                    ].map((item) => (
                      <li key={item.label}>
                        <NavigationMenuLink
                          href="#"
                          className="block rounded-[var(--radius)] p-2 hover:bg-accent"
                        >
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Demo>
        <Demo name="Link Component (asChild)">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <a href="#nav-home">Home</a>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <a href="#docs">Docs</a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Demo>
      </Section>

      <Section
        id="pagination"
        title="Pagination"
        description="Pagination with page navigation, next and previous links."
      >
        <Demo name="Default">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((p) => Math.max(1, p - 1));
                  }}
                />
              </PaginationItem>
              {[1, 2, 3].map((n) => (
                <PaginationItem key={n}>
                  <PaginationLink
                    href="#"
                    isActive={page === n}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(n);
                    }}
                  >
                    {n}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((p) => p + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Demo>
        <Demo name="Simple (numbers only)">
          <Pagination>
            <PaginationContent>
              {[1, 2, 3, 4, 5].map((n) => (
                <PaginationItem key={n}>
                  <PaginationLink href="#" isActive={n === 3}>
                    {n}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </Demo>
        <Demo name="Icons + rows-per-page">
          <div className="flex w-full items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">Page 2 of 24</p>
            <div className="flex items-center gap-2">
              <Select defaultValue="25">
                <SelectTrigger className="h-8 w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["10", "25", "50", "100"].map((n) => (
                    <SelectItem key={n} value={n}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" aria-label="Previous">
                <ChevronLeftIcon />
              </Button>
              <Button variant="outline" size="icon" aria-label="Next">
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </Demo>
      </Section>

      <Section
        id="tabs"
        title="Tabs"
        description="A set of layered sections of content displayed one at a time."
      >
        <Demo name="Default" height="tall">
          <Tabs defaultValue="account" className="w-full">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="api">API keys</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="mt-4 text-sm">
              Account settings panel.
            </TabsContent>
            <TabsContent value="password" className="mt-4 text-sm">
              Password reset panel.
            </TabsContent>
            <TabsContent value="api" className="mt-4 text-sm">
              API keys panel.
            </TabsContent>
          </Tabs>
        </Demo>
        <Demo name='Line (variant="line")' height="tall">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList variant="line">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4 text-sm">
              Overview content.
            </TabsContent>
            <TabsContent value="analytics" className="mt-4 text-sm">
              Analytics content.
            </TabsContent>
            <TabsContent value="reports" className="mt-4 text-sm">
              Reports content.
            </TabsContent>
            <TabsContent value="settings" className="mt-4 text-sm">
              Settings content.
            </TabsContent>
          </Tabs>
        </Demo>
        <Demo name="Vertical">
          <Tabs defaultValue="general" orientation="vertical" className="flex w-full gap-4">
            <TabsList className="flex h-auto flex-col">
              <TabsTrigger value="general" className="w-full justify-start">
                General
              </TabsTrigger>
              <TabsTrigger value="billing" className="w-full justify-start">
                Billing
              </TabsTrigger>
              <TabsTrigger value="team" className="w-full justify-start">
                Team
              </TabsTrigger>
            </TabsList>
            <div className="flex-1 text-sm">
              <TabsContent value="general">General settings.</TabsContent>
              <TabsContent value="billing">Billing settings.</TabsContent>
              <TabsContent value="team">Team management.</TabsContent>
            </div>
          </Tabs>
        </Demo>
        <Demo name="Disabled">
          <Tabs defaultValue="active" className="w-full">
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="archive">Archive</TabsTrigger>
              <TabsTrigger value="locked" disabled>
                Locked
              </TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-4 text-sm">
              Active content.
            </TabsContent>
          </Tabs>
        </Demo>
        <Demo name="Icons">
          <Tabs defaultValue="inbox" className="w-full">
            <TabsList>
              <TabsTrigger value="inbox">
                <MailIcon /> Inbox
              </TabsTrigger>
              <TabsTrigger value="profile">
                <UserIcon /> Profile
              </TabsTrigger>
              <TabsTrigger value="settings">
                <SettingsIcon /> Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="inbox" className="mt-4 text-sm">
              Inbox content.
            </TabsContent>
          </Tabs>
        </Demo>
      </Section>
    </>
  );
}
