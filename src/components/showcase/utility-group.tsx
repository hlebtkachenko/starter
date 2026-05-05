"use client";

import {
  ChevronRightIcon,
  FileTextIcon,
  FolderIcon,
  InboxIcon,
  MoreVerticalIcon,
  PlusIcon,
  SearchIcon,
  UploadIcon,
  UsersIcon,
} from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useMemo, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { Demo, Section } from "./section";

export function UtilityGroup() {
  return (
    <>
      <Section
        id="accordion"
        title="Accordion"
        description="A vertically stacked set of interactive headings that each reveal a section of content."
      >
        <Demo name="Default (single)">
          <Accordion type="single" collapsible className="w-full" defaultValue="a">
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
        <Demo name="Multiple">
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
        <Demo name="Disabled">
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
        <Demo name="Borders">
          <Accordion
            type="single"
            collapsible
            className="w-full divide-y rounded-[var(--radius)] border border-border"
          >
            {[1, 2, 3].map((i) => (
              <AccordionItem key={i} value={`b-${i}`} className="border-b-0 px-4">
                <AccordionTrigger>Bordered section {i}</AccordionTrigger>
                <AccordionContent>Body of section {i}.</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Demo>
        <Demo name="Card">
          <div className="w-full overflow-hidden rounded-[var(--radius)] border border-border bg-card">
            <div className="border-b border-border bg-muted/40 px-4 py-3 text-sm font-semibold">
              FAQ
            </div>
            <Accordion type="single" collapsible className="px-4">
              <AccordionItem value="c-1">
                <AccordionTrigger>Pricing</AccordionTrigger>
                <AccordionContent>$0 free / $20 pro / custom.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="c-2">
                <AccordionTrigger>Cancellation</AccordionTrigger>
                <AccordionContent>Cancel any time, no fees.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Demo>
      </Section>

      <Section
        id="carousel"
        title="Carousel"
        description="A carousel with motion and swipe built using Embla."
      >
        <Demo name="Default" span={2} height="tall">
          <div className="mx-auto w-full max-w-md py-4">
            <Carousel className="w-full">
              <CarouselContent>
                {Array.from({ length: 5 }, (_, i) => (
                  <CarouselItem key={i}>
                    <div className="flex aspect-square items-center justify-center rounded-[var(--radius)] border border-border bg-card">
                      <span className="text-4xl font-bold">{i + 1}</span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </Demo>
        <Demo name="Sizes (basis)">
          <div className="w-full py-4">
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-2">
                {Array.from({ length: 8 }, (_, i) => (
                  <CarouselItem key={i} className="basis-1/2 pl-2 lg:basis-1/3">
                    <div className="flex aspect-square items-center justify-center rounded-[var(--radius)] border border-border bg-card">
                      <span className="text-xl font-semibold">{i + 1}</span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </Demo>
        <Demo name="Spacing">
          <div className="w-full py-4">
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {Array.from({ length: 6 }, (_, i) => (
                  <CarouselItem key={i} className="basis-1/2 pl-4 md:basis-1/3">
                    <div className="flex aspect-video items-center justify-center rounded-[var(--radius)] border border-border bg-card">
                      {i + 1}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </Demo>
        <Demo name="Orientation (vertical)">
          <div className="w-full py-4">
            <Carousel orientation="vertical" className="w-full">
              <CarouselContent className="-mt-2 h-48">
                {Array.from({ length: 4 }, (_, i) => (
                  <CarouselItem key={i} className="pt-2">
                    <div className="flex h-full items-center justify-center rounded-[var(--radius)] border border-border bg-card">
                      {i + 1}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </Demo>
        <Demo name="API (slide N of M)">
          <CarouselApiDemo />
        </Demo>
        <Demo name="Plugins">
          <CarouselAutoplay />
        </Demo>
      </Section>

      <Section id="empty" title="Empty" description="Display an empty state.">
        <Demo name="Default">
          <Empty className="w-full">
            <EmptyHeader>
              <EmptyMedia>
                <InboxIcon className="size-6" />
              </EmptyMedia>
              <EmptyTitle>No messages</EmptyTitle>
              <EmptyDescription>Your inbox is empty. New mail will show here.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        </Demo>
        <Demo name="Outline (dashed border)">
          <Empty className="w-full border-dashed">
            <EmptyHeader>
              <EmptyMedia>
                <UploadIcon className="size-6" />
              </EmptyMedia>
              <EmptyTitle>Upload files</EmptyTitle>
              <EmptyDescription>Drag and drop or click to browse.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button>Choose files</Button>
            </EmptyContent>
          </Empty>
        </Demo>
        <Demo name="Background tint">
          <Empty className="w-full bg-muted/30">
            <EmptyHeader>
              <EmptyTitle>No projects yet</EmptyTitle>
              <EmptyDescription>Create your first project to get started.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button>
                <PlusIcon /> New project
              </Button>
            </EmptyContent>
          </Empty>
        </Demo>
        <Demo name="Avatar">
          <Empty className="w-full">
            <EmptyHeader>
              <EmptyMedia variant="default">
                <Avatar className="size-12">
                  <AvatarFallback>HT</AvatarFallback>
                </Avatar>
              </EmptyMedia>
              <EmptyTitle>Hleb hasn&apos;t posted yet</EmptyTitle>
              <EmptyDescription>Follow to get notified.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        </Demo>
        <Demo name="Avatar group">
          <Empty className="w-full">
            <EmptyHeader>
              <EmptyMedia>
                <AvatarGroup>
                  {["AB", "CD", "EF"].map((i) => (
                    <Avatar key={i}>
                      <AvatarFallback>{i}</AvatarFallback>
                    </Avatar>
                  ))}
                  <AvatarGroupCount>+4</AvatarGroupCount>
                </AvatarGroup>
              </EmptyMedia>
              <EmptyTitle>No collaborators</EmptyTitle>
              <EmptyDescription>Invite teammates to your team.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline">
                <UsersIcon /> Invite
              </Button>
            </EmptyContent>
          </Empty>
        </Demo>
        <Demo name="Search input (404)">
          <Empty className="w-full">
            <EmptyHeader>
              <EmptyMedia>
                <SearchIcon className="size-6" />
              </EmptyMedia>
              <EmptyTitle>No results found</EmptyTitle>
              <EmptyDescription>Try a different search term or check spelling.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <InputGroup className="w-full max-w-xs">
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
                <InputGroupInput placeholder="Search again..." />
              </InputGroup>
            </EmptyContent>
          </Empty>
        </Demo>
      </Section>

      <Section
        id="item"
        title="Item"
        description="A versatile component for displaying content with media, title, description, and actions."
      >
        <Demo name="Default (outline)">
          <Item variant="outline" className="w-full">
            <ItemMedia variant="icon">
              <FileTextIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>report-q2-2026.pdf</ItemTitle>
              <ItemDescription>2.4 MB · Updated 2h ago</ItemDescription>
            </ItemContent>
          </Item>
        </Demo>
        <Demo name="Variants">
          <Item variant="default" className="w-full">
            <ItemContent>
              <ItemTitle>Default</ItemTitle>
            </ItemContent>
          </Item>
          <Item variant="outline" className="w-full">
            <ItemContent>
              <ItemTitle>Outline</ItemTitle>
            </ItemContent>
          </Item>
          <Item variant="muted" className="w-full">
            <ItemContent>
              <ItemTitle>Muted</ItemTitle>
            </ItemContent>
          </Item>
        </Demo>
        <Demo name="Sizes (default / sm / xs)">
          <Item variant="outline" size="default" className="w-full">
            <ItemContent>
              <ItemTitle>Default size</ItemTitle>
            </ItemContent>
          </Item>
          <Item variant="outline" size="sm" className="w-full">
            <ItemContent>
              <ItemTitle>Small size</ItemTitle>
            </ItemContent>
          </Item>
          <Item variant="outline" size="xs" className="w-full">
            <ItemContent>
              <ItemTitle>Extra small</ItemTitle>
            </ItemContent>
          </Item>
        </Demo>
        <Demo name="With icon">
          <Item variant="outline" className="w-full">
            <ItemMedia variant="icon">
              <FolderIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Projects</ItemTitle>
              <ItemDescription>3 active workspaces</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="ghost" size="icon" aria-label="more">
                <ChevronRightIcon />
              </Button>
            </ItemActions>
          </Item>
        </Demo>
        <Demo name="With avatar">
          <Item variant="outline" className="w-full">
            <ItemMedia>
              <Avatar>
                <AvatarFallback>HT</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Hleb Tkachenko</ItemTitle>
              <ItemDescription>hleb@afframe.com</ItemDescription>
            </ItemContent>
          </Item>
        </Demo>
        <Demo name="Group + separator" span={2}>
          <ItemGroup className="w-full">
            {["Inbox", "Drafts", "Sent", "Archive"].map((label, i, arr) => (
              <div key={label}>
                <Item>
                  <ItemMedia variant="icon">
                    <InboxIcon />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{label}</ItemTitle>
                  </ItemContent>
                  <ItemActions>
                    <span className="text-xs text-muted-foreground">{(i + 1) * 7}</span>
                  </ItemActions>
                </Item>
                {i < arr.length - 1 && <ItemSeparator />}
              </div>
            ))}
          </ItemGroup>
        </Demo>
        <Demo name="Header">
          <Item variant="outline" className="w-full">
            <ItemHeader>
              <ItemTitle>Project Phoenix</ItemTitle>
              <ItemDescription>Multi-tenant migration</ItemDescription>
            </ItemHeader>
          </Item>
        </Demo>
        <Demo name="Link (asChild)">
          <Item asChild variant="outline" className="w-full">
            <a href="#">
              <ItemMedia variant="icon">
                <FileTextIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Read documentation</ItemTitle>
                <ItemDescription>Open in a new tab</ItemDescription>
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon className="size-4" />
              </ItemActions>
            </a>
          </Item>
        </Demo>
        <Demo name="Image">
          <Item variant="outline" className="w-full">
            <ItemMedia variant="image">
              <div className="aspect-square size-12 bg-[radial-gradient(circle_at_30%_30%,#dbeafe,transparent_60%),linear-gradient(135deg,#f5f5f5,#e5e5e5)]" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Cover artwork</ItemTitle>
              <ItemDescription>JPG · 1.2 MB</ItemDescription>
            </ItemContent>
          </Item>
        </Demo>
        <Demo name="Dropdown">
          <ItemGroup className="w-full">
            {["design-tokens.json", "system-spec.md", "release-notes.txt"].map((label) => (
              <Item key={label} size="xs">
                <ItemMedia variant="icon">
                  <FileTextIcon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{label}</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label={`actions for ${label}`}>
                        <MoreVerticalIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Open</DropdownMenuItem>
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </ItemActions>
              </Item>
            ))}
          </ItemGroup>
        </Demo>
      </Section>

      <Section id="kbd" title="Kbd" description="Display textual user input from keyboard.">
        <Demo name="Default">
          <Kbd>⌘</Kbd>
          <Kbd>S</Kbd>
          <Kbd>Esc</Kbd>
        </Demo>
        <Demo name="Group (Ctrl+B / Ctrl+K)">
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>B</Kbd>
          </KbdGroup>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </Demo>
        <Demo name="Button">
          <Button variant="outline">
            Submit <Kbd>⏎</Kbd>
          </Button>
        </Demo>
        <Demo name="Tooltip">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Save</Button>
            </TooltipTrigger>
            <TooltipContent className="flex items-center gap-2">
              Save changes <Kbd>S</Kbd>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Print</Button>
            </TooltipTrigger>
            <TooltipContent className="flex items-center gap-2">
              Print
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>P</Kbd>
              </KbdGroup>
            </TooltipContent>
          </Tooltip>
        </Demo>
        <Demo name="Input group">
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon align="inline-end">
              <Kbd>⌘K</Kbd>
            </InputGroupAddon>
          </InputGroup>
        </Demo>
      </Section>
    </>
  );
}

function CarouselApiDemo() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- embla mount sync
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <div className="w-full py-2">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {Array.from({ length: 6 }, (_, i) => (
            <CarouselItem key={i}>
              <div className="flex aspect-video items-center justify-center rounded-[var(--radius)] border border-border bg-card">
                Slide {i + 1}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Slide {current} of {count}
      </p>
    </div>
  );
}

function CarouselAutoplay() {
  const plugin = useMemo(
    () =>
      Autoplay({
        delay: 2000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    [],
  );
  return (
    <div className="w-full py-2">
      <Carousel plugins={[plugin]} className="w-full">
        <CarouselContent>
          {Array.from({ length: 5 }, (_, i) => (
            <CarouselItem key={i}>
              <div className="flex aspect-video items-center justify-center rounded-[var(--radius)] border border-border bg-card">
                {i + 1}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
