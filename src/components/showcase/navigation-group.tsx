"use client";

import {
  CalendarIcon,
  CalculatorIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  CreditCardIcon,
  HomeIcon,
  MailIcon,
  SettingsIcon,
  SmileIcon,
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Demo, Section } from "./section";

export function NavigationGroup() {
  const [page, setPage] = useState(2);

  return (
    <Section
      id="navigation"
      title="Navigation"
      description="Breadcrumb, tabs, navigation menu, menubar, pagination, command palette."
    >
      {/* Breadcrumb */}
      <Demo name="Breadcrumb — basic">
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

      <Demo name="Breadcrumb — custom separator">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>·</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>·</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Demo>

      <Demo name="Breadcrumb — with dropdown">
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

      <Demo name="Breadcrumb — collapsed (ellipsis)">
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

      {/* Tabs */}
      <Demo name="Tabs — default" height="tall">
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="api">API keys</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="mt-4 text-sm">
            Account settings panel content.
          </TabsContent>
          <TabsContent value="password" className="mt-4 text-sm">
            Password reset panel content.
          </TabsContent>
          <TabsContent value="api" className="mt-4 text-sm">
            API keys panel content.
          </TabsContent>
        </Tabs>
      </Demo>

      <Demo name="Tabs — disabled / icons">
        <Tabs defaultValue="inbox" className="w-full">
          <TabsList>
            <TabsTrigger value="inbox">
              <MailIcon /> Inbox
            </TabsTrigger>
            <TabsTrigger value="profile">
              <UserIcon /> Profile
            </TabsTrigger>
            <TabsTrigger value="locked" disabled>
              <SettingsIcon /> Disabled
            </TabsTrigger>
          </TabsList>
          <TabsContent value="inbox" className="mt-4 text-sm">
            Inbox content.
          </TabsContent>
          <TabsContent value="profile" className="mt-4 text-sm">
            Profile content.
          </TabsContent>
        </Tabs>
      </Demo>

      <Demo name="Tabs — vertical">
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

      {/* Navigation menu */}
      <Demo name="Navigation menu" span={2} height="tall">
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
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-48 gap-1 p-3">
                  {["Docs", "Guides", "Blog", "Status"].map((item) => (
                    <li key={item}>
                      <NavigationMenuLink
                        href="#"
                        className="block rounded-[var(--radius)] p-2 hover:bg-accent"
                      >
                        {item}
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#" className="px-3 py-2 text-sm">
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Demo>

      {/* Menubar */}
      <Demo name="Menubar (app-style)" span={2}>
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
              <MenubarSub>
                <MenubarSubTrigger>Recent</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>project-a.ts</MenubarItem>
                  <MenubarItem>project-b.ts</MenubarItem>
                  <MenubarItem>project-c.ts</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
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
              <MenubarSeparator />
              <MenubarCheckboxItem checked>Auto-save</MenubarCheckboxItem>
              <MenubarCheckboxItem>Word wrap</MenubarCheckboxItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarRadioGroup value="comfortable">
                <MenubarRadioItem value="compact">Compact</MenubarRadioItem>
                <MenubarRadioItem value="comfortable">Comfortable</MenubarRadioItem>
                <MenubarRadioItem value="cozy">Cozy</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Profile</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <UserIcon /> Account
              </MenubarItem>
              <MenubarItem>
                <SettingsIcon /> Preferences
              </MenubarItem>
              <MenubarItem>
                <HomeIcon /> Workspace
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Demo>

      {/* Pagination */}
      <Demo name="Pagination — simple">
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
        <p className="w-full text-xs text-muted-foreground">Active page: {page}</p>
      </Demo>

      <Demo name="Pagination — icons only">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button variant="outline" size="icon" aria-label="Previous">
                <ChevronLeftIcon />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button variant="outline" size="icon" aria-label="Next">
                <ChevronRightIcon />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Demo>

      {/* Command */}
      <Demo name="Command — basic" span={2} height="tall">
        <Command className="w-full rounded-[var(--radius)] border border-border">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <CalendarIcon /> Calendar
              </CommandItem>
              <CommandItem>
                <SmileIcon /> Search emoji
              </CommandItem>
              <CommandItem>
                <CalculatorIcon /> Calculator
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <UserIcon /> Profile
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCardIcon /> Billing
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SettingsIcon /> Settings
                <CommandShortcut>⌘,</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </Demo>

      <Demo name="Command — scrollable">
        <Command className="w-full rounded-[var(--radius)] border border-border">
          <CommandInput placeholder="Search timezones..." />
          <CommandList className="max-h-48">
            <CommandEmpty>No match.</CommandEmpty>
            <CommandGroup>
              {Array.from({ length: 30 }, (_, i) => (
                <CommandItem key={i}>Timezone option {i + 1}</CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </Demo>
    </Section>
  );
}
