"use client";

import { CheckCircle2Icon, MailIcon, PencilIcon, RocketIcon, TrashIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
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
  return (
    <>
      <Section
        id="alert-dialog"
        title="Alert Dialog"
        description="A modal dialog that interrupts the user with important content."
      >
        <Demo name="Default">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Confirm action</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Demo>
        <Demo name="Small">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                Small confirm
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
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
        <Demo name="Media">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">With media</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogMedia>
                <RocketIcon className="size-6" />
              </AlertDialogMedia>
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
        <Demo name="Small with media">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                Saved
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogMedia>
                <CheckCircle2Icon className="size-5 text-emerald-500" />
              </AlertDialogMedia>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-base">Saved</AlertDialogTitle>
                <AlertDialogDescription>All changes synced.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>OK</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Demo>
        <Demo name="Destructive">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <TrashIcon /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogMedia className="bg-destructive/10">
                <TrashIcon className="size-5 text-destructive" />
              </AlertDialogMedia>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this project?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove the project and all data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Demo>
      </Section>

      <Section id="dialog" title="Dialog" description="A window overlaid on the primary window.">
        <Demo name="Default">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Edit profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>Make changes and click save.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-2">
                <Label htmlFor="d-name">Name</Label>
                <Input id="d-name" defaultValue="Hleb Tkachenko" />
              </div>
              <DialogFooter>
                <Button>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Demo>
        <Demo name="Custom close button">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <PencilIcon /> Rename
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rename file</DialogTitle>
                <DialogDescription>Pick a new name.</DialogDescription>
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
        <Demo name="No close button">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">No X</Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
              <DialogHeader>
                <DialogTitle>Notice</DialogTitle>
                <DialogDescription>The default X close button is hidden.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Done</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Demo>
        <Demo name="Sticky footer">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Sticky footer</Button>
            </DialogTrigger>
            <DialogContent className="grid max-h-[80vh] grid-rows-[auto_1fr_auto] gap-0 p-0 sm:max-w-lg">
              <DialogHeader className="border-b p-6">
                <DialogTitle>Terms of service</DialogTitle>
                <DialogDescription>Scroll the agreement.</DialogDescription>
              </DialogHeader>
              <div className="overflow-y-auto px-6 py-4 text-sm leading-6">
                {Array.from({ length: 18 }, (_, i) => (
                  <p key={i} className="mb-3">
                    Section {i + 1}: rights, obligations, and data handling rules apply.
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
        <Demo name="Scrollable content">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Scrollable</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[70vh] overflow-hidden p-0 sm:max-w-md">
              <DialogHeader className="border-b p-4">
                <DialogTitle>Activity log</DialogTitle>
              </DialogHeader>
              <div className="max-h-[50vh] overflow-y-auto p-4 text-xs leading-6">
                {Array.from({ length: 30 }, (_, i) => (
                  <p key={i}>Event #{i + 1} — system update.</p>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </Demo>
      </Section>

      <Section id="drawer" title="Drawer" description="A drawer component for React.">
        <Demo name="Default">
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
        <Demo name="Scrollable content">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Logs</Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Logs</DrawerTitle>
                <DrawerDescription>Last 60 events.</DrawerDescription>
              </DrawerHeader>
              <div className="flex-1 overflow-y-auto px-4 pb-4 font-mono text-xs">
                {Array.from({ length: 60 }, (_, i) => (
                  <p key={i}>event #{i}</p>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        </Demo>
        <Demo name="Sides (top / bottom / right / left)" span={2}>
          {(["top", "bottom", "right", "left"] as const).map((d) => (
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
        </Demo>
        <Demo name="Responsive Dialog">
          <p className="w-full text-xs text-muted-foreground">
            In production:{" "}
            <code className="rounded bg-muted px-1">
              useMediaQuery(&quot;(min-width: 768px)&quot;)
            </code>{" "}
            picks Dialog vs Drawer.
          </p>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Try it</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Adaptive surface</DrawerTitle>
                <DrawerDescription>Below md: bottom drawer. Above: Dialog.</DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        </Demo>
      </Section>

      <Section
        id="hover-card"
        title="Hover Card"
        description="For sighted users to preview content available behind a link."
      >
        <Demo name="Basic">
          <HoverCard openDelay={10} closeDelay={100}>
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
        <Demo name="Sides">
          {(["top", "right", "bottom", "left"] as const).map((s) => (
            <HoverCard key={s} openDelay={100}>
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
      </Section>

      <Section
        id="popover"
        title="Popover"
        description="Displays rich content in a portal, triggered by a button."
      >
        <Demo name="Basic">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-72">
              <p className="text-sm font-medium">Popover</p>
              <p className="mt-1 text-xs text-muted-foreground">Place arbitrary content.</p>
            </PopoverContent>
          </Popover>
        </Demo>
        <Demo name="Align (start / center / end)">
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
        <Demo name="With form">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Dimensions</Button>
            </PopoverTrigger>
            <PopoverContent className="w-64" align="start">
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
      </Section>

      <Section
        id="sheet"
        title="Sheet"
        description="Slide-in panel that complements the main content."
      >
        <Demo name="Default">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>Slides from the right edge.</SheetDescription>
              </SheetHeader>
              <SheetFooter>
                <Button>Save</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </Demo>
        <Demo name="Sides" span={2}>
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
              </SheetContent>
            </Sheet>
          ))}
        </Demo>
        <Demo name="No close button">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">No X</Button>
            </SheetTrigger>
            <SheetContent showCloseButton={false}>
              <SheetHeader>
                <SheetTitle>No close button</SheetTitle>
                <SheetDescription>Use a custom button instead.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </Demo>
      </Section>

      <Section
        id="tooltip"
        title="Tooltip"
        description="Popup that displays information related to an element."
      >
        <Demo name="Default">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Compose">
                <MailIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Compose email</TooltipContent>
          </Tooltip>
        </Demo>
        <Demo name="Sides">
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
        <Demo name="With keyboard shortcut">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Save</Button>
            </TooltipTrigger>
            <TooltipContent className="flex items-center gap-2">
              Save changes <Kbd>S</Kbd>
            </TooltipContent>
          </Tooltip>
        </Demo>
        <Demo name="Disabled trigger (wrap span)">
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
      </Section>
    </>
  );
}
