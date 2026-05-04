"use client";

import {
  AtSignIcon,
  BoldIcon,
  CalendarIcon,
  ChevronDownIcon,
  CopyIcon,
  ItalicIcon,
  Loader2Icon,
  MailIcon,
  SearchIcon,
  UnderlineIcon,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { Demo, Section } from "./section";

const FRAMEWORKS = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

export function InputsGroup() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [otp, setOtp] = useState("");
  const [combo, setCombo] = useState("");
  const [slider, setSlider] = useState([50]);
  const [range, setRange] = useState([20, 80]);

  return (
    <Section
      id="inputs"
      title="Inputs and forms"
      description="Buttons, fields, choice, slider, OTP, calendar, combobox, plus input groups."
    >
      {/* Buttons */}
      <Demo name="Button — variants">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </Demo>

      <Demo name="Button — sizes">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="open">
          <ChevronDownIcon />
        </Button>
      </Demo>

      <Demo name="Button — with icon, loading, disabled">
        <Button>
          <MailIcon /> Login with Email
        </Button>
        <Button disabled>
          <Loader2Icon className="animate-spin" /> Please wait
        </Button>
        <Button disabled variant="outline">
          Disabled
        </Button>
      </Demo>

      <Demo name="Button — group (horizontal)" span={2}>
        <div className="inline-flex rounded-[var(--radius)] shadow-sm">
          <Button variant="outline" className="rounded-r-none">
            Year
          </Button>
          <Button variant="outline" className="rounded-none border-l-0">
            Month
          </Button>
          <Button variant="outline" className="rounded-l-none border-l-0">
            Day
          </Button>
        </div>
      </Demo>

      {/* Inputs */}
      <Demo name="Input — basic">
        <Input type="email" placeholder="m@example.com" />
      </Demo>

      <Demo name="Input — with label">
        <div className="grid w-full gap-2">
          <Label htmlFor="email-1">Email</Label>
          <Input id="email-1" type="email" placeholder="m@example.com" />
        </div>
      </Demo>

      <Demo name="Input — disabled / readonly">
        <Input disabled placeholder="Disabled" />
        <Input readOnly defaultValue="Read only value" />
      </Demo>

      <Demo name="Input — invalid">
        <div className="grid w-full gap-2">
          <Label htmlFor="email-x" className="text-destructive">
            Email
          </Label>
          <Input
            id="email-x"
            type="email"
            aria-invalid
            defaultValue="not-an-email"
            className="border-destructive"
          />
          <p className="text-xs text-destructive">Enter a valid email address.</p>
        </div>
      </Demo>

      <Demo name="Input — required">
        <div className="grid w-full gap-2">
          <Label htmlFor="name-r">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input id="name-r" required placeholder="Required" />
        </div>
      </Demo>

      <Demo name="Input — file">
        <div className="grid w-full gap-2">
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" type="file" />
        </div>
      </Demo>

      <Demo name="Input — number / search">
        <Input type="number" placeholder="0" min={0} max={100} />
        <Input type="search" placeholder="Search..." />
      </Demo>

      <Demo name="Input group — leading icon">
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search projects..." />
        </InputGroup>
      </Demo>

      <Demo name="Input group — trailing button">
        <InputGroup>
          <InputGroupInput placeholder="Copy this token" defaultValue="sk_live_…42" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton aria-label="copy">
              <CopyIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Demo>

      <Demo name="Input group — prefix text">
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="acme.com" />
        </InputGroup>
      </Demo>

      <Demo name="Input group — textarea">
        <InputGroup>
          <InputGroupTextarea placeholder="Type your message..." />
          <InputGroupAddon align="block-end">
            <InputGroupText className="ml-auto text-xs">120 chars</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Demo>

      {/* Field primitives */}
      <Demo name="Field — vertical">
        <Field>
          <FieldLabel htmlFor="city-v">City</FieldLabel>
          <Input id="city-v" placeholder="Prague" />
          <FieldDescription>Where you live now.</FieldDescription>
        </Field>
      </Demo>

      <Demo name="Field — horizontal">
        <Field orientation="horizontal">
          <FieldLabel htmlFor="show-help">Show help</FieldLabel>
          <Switch id="show-help" />
        </Field>
      </Demo>

      <Demo name="Field — invalid + error">
        <Field data-invalid>
          <FieldLabel htmlFor="zip-i" className="text-destructive">
            Postcode
          </FieldLabel>
          <Input id="zip-i" defaultValue="abc" className="border-destructive" />
          <FieldError>Postcode must be numeric.</FieldError>
        </Field>
      </Demo>

      <Demo name="FieldSet — legend + group">
        <FieldSet>
          <FieldLegend>Notifications</FieldLegend>
          <FieldGroup>
            <Field orientation="horizontal">
              <Checkbox id="n-email" defaultChecked />
              <FieldLabel htmlFor="n-email" className="font-normal">
                Email me about updates
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="n-push" />
              <FieldLabel htmlFor="n-push" className="font-normal">
                Push notifications
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </Demo>

      <Demo name="Field group — full form" span={2}>
        <FieldGroup className="w-full max-w-2xl">
          <Field>
            <FieldLabel htmlFor="full-name">Full name</FieldLabel>
            <Input id="full-name" placeholder="Jane Doe" />
            <FieldDescription>Shown on your profile.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="role-2">Role</FieldLabel>
            <Input id="role-2" placeholder="Engineer" />
          </Field>
          <Field>
            <FieldLabel htmlFor="bio-2">Bio</FieldLabel>
            <Textarea id="bio-2" placeholder="A short bio" rows={3} />
          </Field>
        </FieldGroup>
      </Demo>

      {/* Textarea */}
      <Demo name="Textarea — basic / disabled / invalid">
        <Textarea placeholder="Type something" />
        <Textarea disabled placeholder="Disabled" />
        <Textarea aria-invalid defaultValue="Bad input" className="border-destructive" />
      </Demo>

      {/* Choice */}
      <Demo name="Checkbox — states">
        <div className="flex items-center gap-2">
          <Checkbox id="c1" defaultChecked />
          <Label htmlFor="c1">Checked</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="c2" />
          <Label htmlFor="c2">Unchecked</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="c3" disabled defaultChecked />
          <Label htmlFor="c3">Disabled</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="c4" checked="indeterminate" />
          <Label htmlFor="c4">Indeterminate</Label>
        </div>
      </Demo>

      <Demo name="Radio group">
        <RadioGroup defaultValue="comfortable">
          {(["default", "comfortable", "compact"] as const).map((v) => (
            <div key={v} className="flex items-center gap-2">
              <RadioGroupItem id={`r-${v}`} value={v} />
              <Label htmlFor={`r-${v}`} className="capitalize">
                {v}
              </Label>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <RadioGroupItem id="r-disabled" value="disabled" disabled />
            <Label htmlFor="r-disabled">Disabled</Label>
          </div>
        </RadioGroup>
      </Demo>

      <Demo name="Switch — states">
        <div className="flex items-center gap-2">
          <Switch id="s1" defaultChecked />
          <Label htmlFor="s1">On</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="s2" />
          <Label htmlFor="s2">Off</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="s3" disabled defaultChecked />
          <Label htmlFor="s3">Disabled</Label>
        </div>
      </Demo>

      <Demo name="Select — basic / groups">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Citrus</SelectLabel>
              <SelectItem value="orange">Orange</SelectItem>
              <SelectItem value="lemon">Lemon</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Berries</SelectLabel>
              <SelectItem value="strawberry">Strawberry</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select disabled>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Disabled" />
          </SelectTrigger>
        </Select>
      </Demo>

      <Demo name="Combobox — search + select">
        <Combobox value={combo} onValueChange={(v) => setCombo(v ?? "")}>
          <ComboboxTrigger className="w-[220px]">
            <ComboboxValue placeholder="Select framework" />
          </ComboboxTrigger>
          <ComboboxContent>
            <ComboboxInput placeholder="Search framework" />
            <ComboboxList>
              <ComboboxEmpty>No framework found.</ComboboxEmpty>
              <ComboboxGroup>
                {FRAMEWORKS.map((f) => (
                  <ComboboxItem key={f.value} value={f.value}>
                    {f.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Demo>

      <Demo name="Slider — single">
        <div className="w-full">
          <Slider value={slider} onValueChange={setSlider} max={100} step={1} />
          <p className="mt-2 text-xs text-muted-foreground">Value: {slider[0]}</p>
        </div>
      </Demo>

      <Demo name="Slider — range / disabled">
        <div className="w-full space-y-4">
          <Slider value={range} onValueChange={setRange} max={100} step={1} />
          <p className="text-xs text-muted-foreground">
            Range: {range[0]} - {range[1]}
          </p>
          <Slider defaultValue={[40]} disabled />
        </div>
      </Demo>

      <Demo name="Toggle">
        <Toggle aria-label="Bold">
          <BoldIcon />
        </Toggle>
        <Toggle aria-label="Italic" defaultPressed>
          <ItalicIcon />
        </Toggle>
        <Toggle aria-label="Underline" disabled>
          <UnderlineIcon />
        </Toggle>
      </Demo>

      <Demo name="Toggle group">
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
        <ToggleGroup type="single" variant="outline" defaultValue="left">
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </Demo>

      <Demo name="Input OTP — 6 digits with separator">
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Demo>

      <Demo name="Input OTP — 4 digits">
        <InputOTP maxLength={4} defaultValue="1">
          <InputOTPGroup>
            {[0, 1, 2, 3].map((i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </Demo>

      <Demo name="Calendar — single (inline)" span={2} height="tall">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-[var(--radius)] border border-border"
        />
      </Demo>

      <Demo name="Date picker">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start font-normal">
              <CalendarIcon /> {date ? date.toDateString() : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>
      </Demo>

      <Demo name="Field with badge label">
        <Field>
          <div className="flex items-center gap-2">
            <FieldLabel htmlFor="api-key">API key</FieldLabel>
            <Badge variant="secondary">Pro</Badge>
          </div>
          <InputGroup>
            <InputGroupAddon>
              <AtSignIcon />
            </InputGroupAddon>
            <InputGroupInput id="api-key" placeholder="sk-..." />
          </InputGroup>
          <FieldDescription>Available on Pro plans.</FieldDescription>
        </Field>
      </Demo>
    </Section>
  );
}
