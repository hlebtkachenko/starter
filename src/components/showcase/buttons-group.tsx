"use client";

import {
  BoldIcon,
  ChevronDownIcon,
  ItalicIcon,
  Loader2Icon,
  MailIcon,
  PlusIcon,
  StarIcon,
  UnderlineIcon,
  VolumeIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { Demo, Section } from "./section";

export function ButtonsGroup() {
  return (
    <>
      <Section
        id="button"
        title="Button"
        description="Displays a button or a component that looks like a button."
      >
        <Demo name="Default">
          <Button>Button</Button>
        </Demo>
        <Demo name="Secondary">
          <Button variant="secondary">Secondary</Button>
        </Demo>
        <Demo name="Destructive">
          <Button variant="destructive">Destructive</Button>
        </Demo>
        <Demo name="Outline">
          <Button variant="outline">Outline</Button>
        </Demo>
        <Demo name="Ghost">
          <Button variant="ghost">Ghost</Button>
        </Demo>
        <Demo name="Link">
          <Button variant="link">Link</Button>
        </Demo>
        <Demo name="Icon">
          <Button variant="outline" size="icon" aria-label="next">
            <ChevronDownIcon />
          </Button>
        </Demo>
        <Demo name="With Icon">
          <Button>
            <MailIcon /> Login with Email
          </Button>
        </Demo>
        <Demo name="Rounded">
          <Button className="rounded-full">Pill</Button>
        </Demo>
        <Demo name="Spinner">
          <Button disabled>
            <Loader2Icon className="animate-spin" /> Loading
          </Button>
        </Demo>
        <Demo name="Size">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
        </Demo>
        <Demo name="As Child">
          <Button asChild>
            <a href="#">Read docs</a>
          </Button>
        </Demo>
      </Section>

      <Section
        id="button-group"
        title="Button Group"
        description="A container that groups related buttons with consistent styling."
      >
        <Demo name="Default">
          <ButtonGroup>
            <Button variant="outline">Day</Button>
            <Button variant="outline">Week</Button>
            <Button variant="outline">Month</Button>
          </ButtonGroup>
        </Demo>
        <Demo name="Vertical orientation">
          <ButtonGroup orientation="vertical">
            <Button variant="outline">Top</Button>
            <Button variant="outline">Middle</Button>
            <Button variant="outline">Bottom</Button>
          </ButtonGroup>
        </Demo>
        <Demo name="Sizes">
          <ButtonGroup>
            <Button size="sm" variant="outline">
              Save
            </Button>
            <Button size="sm" variant="outline">
              Discard
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button size="lg" variant="outline">
              Save
            </Button>
            <Button size="lg" variant="outline">
              Discard
            </Button>
          </ButtonGroup>
        </Demo>
        <Demo name="Separator">
          <ButtonGroup>
            <Button variant="outline">Copy</Button>
            <ButtonGroupSeparator />
            <Button variant="outline" size="icon" aria-label="more">
              <ChevronDownIcon />
            </Button>
          </ButtonGroup>
        </Demo>
        <Demo name="Split (with dropdown)">
          <ButtonGroup>
            <Button variant="outline">Deploy</Button>
            <ButtonGroupSeparator />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="more options">
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Preview</DropdownMenuItem>
                <DropdownMenuItem>Production</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </Demo>
        <Demo name="Input + button">
          <ButtonGroup>
            <Input placeholder="Search..." className="w-44" />
            <Button>Go</Button>
          </ButtonGroup>
        </Demo>
        <Demo name="Input group">
          <ButtonGroup>
            <InputGroup>
              <InputGroupAddon>
                <VolumeIcon />
              </InputGroupAddon>
              <InputGroupInput placeholder="Voice command..." />
            </InputGroup>
            <Button variant="outline" size="icon" aria-label="record">
              <PlusIcon />
            </Button>
          </ButtonGroup>
        </Demo>
        <Demo name="Select + input (currency)">
          <ButtonGroup>
            <Select defaultValue="usd">
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eur">EUR</SelectItem>
                <SelectItem value="czk">CZK</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="0.00" type="number" />
          </ButtonGroup>
        </Demo>
        <Demo name="Text">
          <ButtonGroup>
            <ButtonGroupText>Limit</ButtonGroupText>
            <Button variant="outline">10</Button>
            <Button variant="outline">25</Button>
            <Button variant="outline">50</Button>
          </ButtonGroup>
        </Demo>
        <Demo name="Nested">
          <ButtonGroup>
            <ButtonGroup>
              <Button variant="outline">Save</Button>
              <Button variant="outline">Discard</Button>
            </ButtonGroup>
            <ButtonGroupSeparator />
            <ButtonGroup>
              <Button variant="outline">Copy</Button>
              <Button variant="outline">Paste</Button>
            </ButtonGroup>
          </ButtonGroup>
        </Demo>
        <Demo name="Popover">
          <ButtonGroup>
            <Button variant="outline">Share</Button>
            <ButtonGroupSeparator />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" aria-label="more">
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-56">
                <div className="grid gap-2 text-sm">
                  <p className="font-medium">Share options</p>
                  <p className="text-muted-foreground">Choose where to send this link.</p>
                </div>
              </PopoverContent>
            </Popover>
          </ButtonGroup>
        </Demo>
      </Section>

      <Section
        id="toggle"
        title="Toggle"
        description="A two-state button that can be either on or off."
      >
        <Demo name="Default">
          <Toggle aria-label="Bookmark">
            <StarIcon />
          </Toggle>
        </Demo>
        <Demo name="Outline">
          <Toggle variant="outline" aria-label="Bold" defaultPressed>
            <BoldIcon />
          </Toggle>
        </Demo>
        <Demo name="With text">
          <Toggle defaultPressed>
            <BoldIcon /> Bold
          </Toggle>
          <Toggle variant="outline">
            <ItalicIcon /> Italic
          </Toggle>
        </Demo>
        <Demo name="Sizes">
          <Toggle size="sm" aria-label="sm">
            <BoldIcon />
          </Toggle>
          <Toggle aria-label="default">
            <BoldIcon />
          </Toggle>
          <Toggle size="lg" aria-label="lg">
            <BoldIcon />
          </Toggle>
        </Demo>
        <Demo name="Disabled">
          <Toggle aria-label="Italic" disabled>
            <ItalicIcon />
          </Toggle>
        </Demo>
      </Section>

      <Section
        id="toggle-group"
        title="Toggle Group"
        description="A set of two-state buttons that can be toggled on or off."
      >
        <Demo name="Default (multiple)">
          <ToggleGroup type="multiple" defaultValue={["bold"]}>
            <ToggleGroupItem value="bold" aria-label="Bold">
              <BoldIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <ItalicIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <UnderlineIcon />
            </ToggleGroupItem>
          </ToggleGroup>
        </Demo>
        <Demo name="Outline (single)">
          <ToggleGroup type="single" variant="outline" defaultValue="left">
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>
        </Demo>
        <Demo name="Sizes">
          <ToggleGroup type="single" size="sm" defaultValue="b">
            <ToggleGroupItem value="a">A</ToggleGroupItem>
            <ToggleGroupItem value="b">B</ToggleGroupItem>
            <ToggleGroupItem value="c">C</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="single" size="lg" defaultValue="b">
            <ToggleGroupItem value="a">A</ToggleGroupItem>
            <ToggleGroupItem value="b">B</ToggleGroupItem>
            <ToggleGroupItem value="c">C</ToggleGroupItem>
          </ToggleGroup>
        </Demo>
        <Demo name="Vertical">
          <ToggleGroup type="single" orientation="vertical" variant="outline" defaultValue="top">
            <ToggleGroupItem value="top">Top</ToggleGroupItem>
            <ToggleGroupItem value="middle">Middle</ToggleGroupItem>
            <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
          </ToggleGroup>
        </Demo>
        <Demo name="Disabled">
          <ToggleGroup type="single" disabled defaultValue="x">
            <ToggleGroupItem value="x">X</ToggleGroupItem>
            <ToggleGroupItem value="y">Y</ToggleGroupItem>
          </ToggleGroup>
        </Demo>
        <Demo name="Spacing">
          <ToggleGroup type="single" variant="outline" defaultValue="left" className="gap-1">
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>
        </Demo>
        <Demo name="Custom">
          <ToggleGroup type="single" variant="outline" defaultValue="500" className="gap-1">
            <ToggleGroupItem value="300" className="font-light">
              Light
            </ToggleGroupItem>
            <ToggleGroupItem value="400" className="font-normal">
              Normal
            </ToggleGroupItem>
            <ToggleGroupItem value="500" className="font-medium">
              Medium
            </ToggleGroupItem>
            <ToggleGroupItem value="700" className="font-bold">
              Bold
            </ToggleGroupItem>
          </ToggleGroup>
        </Demo>
      </Section>
    </>
  );
}
