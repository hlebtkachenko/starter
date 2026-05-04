"use client";

import {
  ArchiveIcon,
  ChevronRightIcon,
  CopyIcon,
  CreditCardIcon,
  EditIcon,
  LogOutIcon,
  MailIcon,
  MoreHorizontalIcon,
  SettingsIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { Demo, Section } from "./section";

export function OverlaysGroup() {
  const [showStatus, setShowStatus] = useState(true);
  const [position, setPosition] = useState("bottom");

  return (
    <Section
      id="overlays"
      title="Overlays"
      description="Dialog, sheet, drawer, popover, hover card, tooltip, context menu, dropdown menu."
    >
      {/* Dialog */}
      <Demo name="Dialog — basic">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>Make changes and click save.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 py-2">
              <div className="grid gap-2">
                <Label htmlFor="d-name">Name</Label>
                <Input id="d-name" defaultValue="Hleb Tkachenko" />
              </div>
            </div>
            <DialogFooter>
              <Button>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Demo>

      <Demo name="Dialog — rename file (custom close)">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Rename file</Button>
          </DialogTrigger>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Rename file</DialogTitle>
              <DialogDescription>
                Pick a new name. The original is preserved in history.
              </DialogDescription>
            </DialogHeader>
            <Input defaultValue="report-q2-2026.pdf" />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Demo>

      <Demo name="Dialog — sticky footer / scrollable">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Terms of service</Button>
          </DialogTrigger>
          <DialogContent
            showCloseButton={false}
            className="grid max-h-[80vh] grid-rows-[auto_1fr_auto] gap-0 p-0 sm:max-w-lg"
          >
            <DialogHeader className="border-b p-6">
              <DialogTitle>Terms of service</DialogTitle>
              <DialogDescription>Scroll through the agreement.</DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto px-6 py-4 text-sm leading-6">
              {Array.from({ length: 18 }, (_, i) => (
                <p key={i} className="mb-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Section {i + 1} of the
                  agreement: rights, obligations, and data handling rules apply.
                </p>
              ))}
            </div>
            <DialogFooter className="border-t bg-background p-6">
              <DialogClose asChild>
                <Button variant="ghost">Decline</Button>
              </DialogClose>
              <Button>I agree</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Demo>

      {/* Alert dialog */}
      <Demo name="Alert dialog — basic / destructive">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <TrashIcon /> Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Demo>

      <Demo name="Alert dialog — small">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="outline">
              Small confirm
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="sm:max-w-xs">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-base">Sign out?</AlertDialogTitle>
              <AlertDialogDescription>You can sign back in any time.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Sign out</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Demo>

      <Demo name="Alert dialog — with media">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">With media</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className="aspect-video w-full overflow-hidden rounded-md bg-[radial-gradient(circle_at_30%_30%,#dbeafe,transparent_60%),linear-gradient(135deg,#f5f5f5,#e5e5e5)]" />
            <AlertDialogHeader>
              <AlertDialogTitle>Welcome to LAC v3</AlertDialogTitle>
              <AlertDialogDescription>
                Faster compute, larger storage, redesigned AI assistant.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Skip</AlertDialogCancel>
              <AlertDialogAction>What&apos;s new</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Demo>

      {/* Sheet */}
      <Demo name="Sheet — sides" span={2}>
        {(["right", "left", "top", "bottom"] as const).map((side) => (
          <Sheet key={side}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="capitalize">
                {side}
              </Button>
            </SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetTitle>{side} sheet</SheetTitle>
                <SheetDescription>Slides in from the {side} edge.</SheetDescription>
              </SheetHeader>
              <SheetFooter>
                <Button>Save</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ))}
      </Demo>

      {/* Drawer */}
      <Demo name="Drawer — basic">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Move goal</DrawerTitle>
              <DrawerDescription>Set your daily activity goal.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 text-sm text-muted-foreground">Drawer body</div>
            <DrawerFooter>
              <Button>Submit</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Demo>

      <Demo name="Drawer — scrollable">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Long drawer</Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[80vh]">
            <DrawerHeader>
              <DrawerTitle>Logs</DrawerTitle>
              <DrawerDescription>Last 1,000 events.</DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto px-4 pb-4 font-mono text-xs">
              {Array.from({ length: 60 }, (_, i) => (
                <p key={i}>
                  2026-05-04 12:{String(59 - (i % 60)).padStart(2, "0")} · event #{i}
                </p>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </Demo>

      <Demo name="Drawer — sides">
        <div className="flex flex-wrap gap-2">
          {(["bottom", "top"] as const).map((d) => (
            <Drawer key={d} direction={d}>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm" className="capitalize">
                  {d}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>{d} drawer</DrawerTitle>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          ))}
        </div>
      </Demo>

      {/* Popover */}
      <Demo name="Popover — basic">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <p className="text-sm">Popover with arbitrary content.</p>
          </PopoverContent>
        </Popover>
      </Demo>

      <Demo name="Popover — align (start / center / end)">
        {(["start", "center", "end"] as const).map((a) => (
          <Popover key={a}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="capitalize">
                {a}
              </Button>
            </PopoverTrigger>
            <PopoverContent align={a} className="w-48 text-sm">
              align=&quot;{a}&quot;
            </PopoverContent>
          </Popover>
        ))}
      </Demo>

      <Demo name="Popover — with form">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Dimensions</Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="space-y-3">
              <p className="text-sm font-medium">Dimensions</p>
              <div className="grid gap-2">
                <Label htmlFor="w">Width</Label>
                <Input id="w" defaultValue="100%" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="h">Height</Label>
                <Input id="h" defaultValue="auto" />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </Demo>

      {/* Hover card */}
      <Demo name="Hover card — basic">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@shadcn</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-64">
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium">shadcn</p>
                <p className="text-xs text-muted-foreground">Building component libraries.</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </Demo>

      <Demo name="Hover card — sides">
        {(["top", "right", "bottom", "left"] as const).map((s) => (
          <HoverCard key={s}>
            <HoverCardTrigger asChild>
              <Button variant="outline" size="sm" className="capitalize">
                {s}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent side={s} className="w-48 text-sm">
              side=&quot;{s}&quot;
            </HoverCardContent>
          </HoverCard>
        ))}
      </Demo>

      {/* Tooltip */}
      <Demo name="Tooltip — hover">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Compose">
              <MailIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Compose email</TooltipContent>
        </Tooltip>
      </Demo>

      <Demo name="Tooltip — sides">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="capitalize">
                {side}
              </Button>
            </TooltipTrigger>
            <TooltipContent side={side}>{side} tooltip</TooltipContent>
          </Tooltip>
        ))}
      </Demo>

      <Demo name="Tooltip — with shortcut">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Save</Button>
          </TooltipTrigger>
          <TooltipContent>
            Save document <kbd className="ml-2 rounded bg-foreground/10 px-1.5 text-xs">⌘S</kbd>
          </TooltipContent>
        </Tooltip>
      </Demo>

      <Demo name="Tooltip — disabled trigger">
        <Tooltip>
          <TooltipTrigger asChild>
            <span tabIndex={0}>
              <Button disabled variant="outline">
                Disabled
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>You don&apos;t have permission.</TooltipContent>
        </Tooltip>
      </Demo>

      {/* Context menu */}
      <Demo name="Context menu (right-click)" span={2}>
        <ContextMenu>
          <ContextMenuTrigger className="flex h-32 w-full items-center justify-center rounded-[var(--radius)] border border-dashed border-border text-sm text-muted-foreground">
            Right-click anywhere
          </ContextMenuTrigger>
          <ContextMenuContent className="w-56">
            <ContextMenuLabel>Actions</ContextMenuLabel>
            <ContextMenuGroup>
              <ContextMenuItem>
                <EditIcon /> Edit
                <ContextMenuShortcut>⌘E</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <CopyIcon /> Copy
                <ContextMenuShortcut>⌘C</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger>
                <ArchiveIcon /> Move to
              </ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem>Inbox</ContextMenuItem>
                <ContextMenuItem>Archive</ContextMenuItem>
                <ContextMenuItem>Spam</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem
              checked={showStatus}
              onCheckedChange={(v) => setShowStatus(v === true)}
            >
              Show status
            </ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuRadioGroup value={position} onValueChange={setPosition}>
              <ContextMenuRadioItem value="top">Top</ContextMenuRadioItem>
              <ContextMenuRadioItem value="bottom">Bottom</ContextMenuRadioItem>
              <ContextMenuRadioItem value="right">Right</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">
              <TrashIcon /> Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Demo>

      {/* Dropdown menu */}
      <Demo name="Dropdown menu — basic / icons / shortcuts">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Account</Button>
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
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon /> Settings
                <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOutIcon /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Demo>

      <Demo name="Dropdown menu — checkboxes / radios">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">View</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuCheckboxItem checked>Status bar</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Activity bar</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem disabled>Panel</DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Density</DropdownMenuLabel>
            <DropdownMenuRadioGroup value="comfortable">
              <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="cozy">Cozy</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Demo>

      <Demo name="Dropdown menu — submenu">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">More</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
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

      <Demo name="Dropdown menu — avatar trigger">
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
            <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Demo>

      <Demo name="Dropdown — icon-only trigger">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="open menu">
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Demo>
    </Section>
  );
}
