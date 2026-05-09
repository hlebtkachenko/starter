"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  PlusIcon,
  FileTextIcon,
  UserPlusIcon,
  HomeIcon,
  InboxIcon,
  MoonIcon,
  LogOutIcon,
} from "lucide-react";

export default function CommandActionPalette() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline">
        Quick Actions
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="**:data-[selected=true]:bg-muted **:data-selected:bg-transparent">
          <CommandInput placeholder="What do you need?" />
          <CommandList>
            <CommandEmpty>No actions found.</CommandEmpty>
            <CommandGroup heading="Create">
              <CommandItem>
                <PlusIcon />
                <span>New Project</span>
                <CommandShortcut>&#8984;N</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <FileTextIcon />
                <span>New Document</span>
                <CommandShortcut>&#8984;&#8679;N</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <UserPlusIcon />
                <span>Invite Member</span>
                <CommandShortcut>&#8984;I</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Navigate">
              <CommandItem>
                <HomeIcon />
                <span>Go to Dashboard</span>
                <CommandShortcut>&#8984;D</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <InboxIcon />
                <span>Go to Inbox</span>
                <CommandShortcut>&#8984;&#8679;I</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="System">
              <CommandItem>
                <MoonIcon />
                <span>Toggle Dark Mode</span>
                <CommandShortcut>&#8984;&#8679;D</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <LogOutIcon />
                <span>Sign Out</span>
                <CommandShortcut>&#8984;Q</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
