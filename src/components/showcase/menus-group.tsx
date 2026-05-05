"use client";

import {
  ArchiveIcon,
  CalculatorIcon,
  CalendarIcon,
  ChevronRightIcon,
  ClipboardPasteIcon,
  CopyIcon,
  CreditCardIcon,
  EditIcon,
  LogOutIcon,
  MailIcon,
  MoreHorizontalIcon,
  ScissorsIcon,
  SettingsIcon,
  SmileIcon,
  TrashIcon,
  UserIcon,
  WalletIcon,
} from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Demo, Section } from "./section";

export function MenusGroup() {
  const [showStatus, setShowStatus] = useState(true);
  const [showActivity, setShowActivity] = useState(false);
  const [position, setPosition] = useState("bottom");
  const [theme, setTheme] = useState("system");

  return (
    <>
      <Section
        id="command"
        title="Command"
        description="Command menu for search and quick actions."
      >
        <Demo name="Basic" span={2} height="tall">
          <Command className="w-full rounded-[var(--radius)] border border-border">
            <CommandInput placeholder="Type a command..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search emoji</CommandItem>
                <CommandItem>Calculator</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </Demo>
        <Demo name="Shortcuts">
          <Command className="w-full rounded-[var(--radius)] border border-border">
            <CommandList>
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
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </Demo>
        <Demo name="Groups (with icons)" span={2}>
          <Command className="w-full rounded-[var(--radius)] border border-border">
            <CommandInput placeholder="Search commands..." />
            <CommandList>
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
                  <WalletIcon /> Wallet
                  <CommandShortcut>⌘W</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </Demo>
        <Demo name="Scrollable">
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

      <Section
        id="context-menu"
        title="Context Menu"
        description="Displays a menu of actions triggered by a right click."
      >
        <Demo name="Basic">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-[var(--radius)] border border-dashed border-border text-sm text-muted-foreground">
              Right-click
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Back</ContextMenuItem>
              <ContextMenuItem>Forward</ContextMenuItem>
              <ContextMenuItem disabled>Reload (locked)</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Demo>
        <Demo name="Submenu">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-[var(--radius)] border border-dashed border-border text-sm text-muted-foreground">
              Right-click
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>New tab</ContextMenuItem>
              <ContextMenuSub>
                <ContextMenuSubTrigger>Move to</ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuItem>Inbox</ContextMenuItem>
                  <ContextMenuItem>Archive</ContextMenuItem>
                  <ContextMenuItem>Spam</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
            </ContextMenuContent>
          </ContextMenu>
        </Demo>
        <Demo name="Shortcuts">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-[var(--radius)] border border-dashed border-border text-sm text-muted-foreground">
              Right-click
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>
                Cut <ContextMenuShortcut>⌘X</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                Copy <ContextMenuShortcut>⌘C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                Paste <ContextMenuShortcut>⌘V</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Demo>
        <Demo name="Groups + label">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-[var(--radius)] border border-dashed border-border text-sm text-muted-foreground">
              Right-click
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuLabel>Workspace</ContextMenuLabel>
              <ContextMenuGroup>
                <ContextMenuItem>Switch team</ContextMenuItem>
                <ContextMenuItem>Invite member</ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuLabel>Project</ContextMenuLabel>
              <ContextMenuGroup>
                <ContextMenuItem>Rename</ContextMenuItem>
                <ContextMenuItem>Archive</ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenuContent>
          </ContextMenu>
        </Demo>
        <Demo name="Icons">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-[var(--radius)] border border-dashed border-border text-sm text-muted-foreground">
              Right-click
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>
                <CopyIcon /> Copy
              </ContextMenuItem>
              <ContextMenuItem>
                <ScissorsIcon /> Cut
              </ContextMenuItem>
              <ContextMenuItem>
                <ClipboardPasteIcon /> Paste
              </ContextMenuItem>
              <ContextMenuItem>
                <TrashIcon /> Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Demo>
        <Demo name="Checkboxes">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-[var(--radius)] border border-dashed border-border text-sm text-muted-foreground">
              Right-click
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuCheckboxItem
                checked={showStatus}
                onCheckedChange={(v) => setShowStatus(v === true)}
              >
                Show status
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem
                checked={showActivity}
                onCheckedChange={(v) => setShowActivity(v === true)}
              >
                Show activity
              </ContextMenuCheckboxItem>
            </ContextMenuContent>
          </ContextMenu>
        </Demo>
        <Demo name="Radio">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-[var(--radius)] border border-dashed border-border text-sm text-muted-foreground">
              Right-click
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuRadioGroup value={position} onValueChange={setPosition}>
                <ContextMenuRadioItem value="top">Top</ContextMenuRadioItem>
                <ContextMenuRadioItem value="bottom">Bottom</ContextMenuRadioItem>
                <ContextMenuRadioItem value="right">Right</ContextMenuRadioItem>
              </ContextMenuRadioGroup>
            </ContextMenuContent>
          </ContextMenu>
        </Demo>
        <Demo name="Destructive">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-[var(--radius)] border border-dashed border-border text-sm text-muted-foreground">
              Right-click
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>
                <ArchiveIcon /> Archive
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem variant="destructive">
                <TrashIcon /> Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Demo>
      </Section>

      <Section id="dropdown-menu" title="Dropdown Menu" description="A menu triggered by a button.">
        <Demo name="Basic">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem disabled>Locked</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>
        <Demo name="Submenu">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">More</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>New tab</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  Share <ChevronRightIcon className="ml-auto" />
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Slack</DropdownMenuItem>
                  <DropdownMenuItem>Copy link</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>
        <Demo name="Shortcuts">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Account</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Log out <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>
        <Demo name="Icons (destructive)">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <EditIcon /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CopyIcon /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <TrashIcon /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>
        <Demo name="Checkboxes">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">View</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuCheckboxItem checked>Status bar</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Activity bar</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem disabled>Panel</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>
        <Demo name="Checkboxes with icons">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Notifications</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem checked>
                <MailIcon /> Email
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                <SmileIcon /> Push
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>
        <Demo name="Radio group">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Theme</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>
        <Demo name="Radio with icons">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Payment</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup value="card">
                <DropdownMenuRadioItem value="card">
                  <CreditCardIcon /> Card
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="wallet">
                  <WalletIcon /> Wallet
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>
        <Demo name="Destructive only">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="row actions">
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem variant="destructive">
                <TrashIcon /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>
        <Demo name="Avatar trigger" span={2}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-9 rounded-full">
                <Avatar>
                  <AvatarFallback>HT</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-3 p-2">
                <Avatar>
                  <AvatarFallback>HT</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">Hleb Tkachenko</p>
                  <p className="text-xs text-muted-foreground">hleb@afframe.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <LogOutIcon /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>
        <Demo name="Complex (groups + checks + radios + sub)" span={2}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open complex</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <UserIcon /> Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCardIcon /> Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon /> Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Preferences</DropdownMenuLabel>
              <DropdownMenuCheckboxItem checked>Show status</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Show activity</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Density</DropdownMenuLabel>
              <DropdownMenuRadioGroup value="comfortable">
                <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="cozy">Cozy</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Invite users</DropdownMenuItem>
                  <DropdownMenuItem>New team</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <LogOutIcon /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>
      </Section>
    </>
  );
}
