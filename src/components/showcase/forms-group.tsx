"use client";

import {
  AtSignIcon,
  CalendarIcon,
  CopyIcon,
  CreditCardIcon,
  FileTextIcon,
  GlobeIcon,
  Loader2Icon,
  LockIcon,
  MailIcon,
  MoreHorizontalIcon,
  SearchIcon,
} from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
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
import { Kbd } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";
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
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { Demo, Section } from "./section";

const FRAMEWORKS = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "qwik", label: "Qwik" },
];

const ROWS = ["Recents", "Home", "Applications", "Documents"];

export function FormsGroup() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [otp, setOtp] = useState("");
  const [combo, setCombo] = useState("");
  const [comboMulti, setComboMulti] = useState<string[]>(["next.js", "remix"]);
  const [comboGroups, setComboGroups] = useState("");
  const [slider, setSlider] = useState([50]);
  const [range, setRange] = useState([25, 50]);
  const [multi, setMulti] = useState([10, 20, 70]);
  const [showPassword, setShowPassword] = useState(false);
  const [naturalText, setNaturalText] = useState("Tomorrow at 3pm");
  const [tableSelect, setTableSelect] = useState<Set<string>>(new Set());

  return (
    <>
      <Section
        id="checkbox"
        title="Checkbox"
        description="A control that allows the user to toggle between checked and not checked."
      >
        <Demo name="Basic">
          <Field orientation="horizontal">
            <Checkbox id="cb-basic" defaultChecked />
            <FieldLabel htmlFor="cb-basic" className="font-normal">
              Accept terms and conditions
            </FieldLabel>
          </Field>
        </Demo>
        <Demo name="Description">
          <Field orientation="horizontal">
            <Checkbox id="cb-mkt" />
            <FieldContent>
              <FieldTitle>Marketing emails</FieldTitle>
              <FieldDescription>Receive emails about new products and updates.</FieldDescription>
            </FieldContent>
          </Field>
        </Demo>
        <Demo name="Disabled / indeterminate">
          <Field orientation="horizontal">
            <Checkbox id="cb-dis" disabled defaultChecked />
            <FieldLabel htmlFor="cb-dis" className="font-normal">
              Disabled
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="cb-ind" checked="indeterminate" />
            <FieldLabel htmlFor="cb-ind" className="font-normal">
              Indeterminate
            </FieldLabel>
          </Field>
        </Demo>
        <Demo name="Group">
          <FieldGroup>
            {ROWS.map((label) => (
              <Field key={label} orientation="horizontal">
                <Checkbox id={`cg-${label}`} defaultChecked={label === "Home"} />
                <FieldLabel htmlFor={`cg-${label}`} className="font-normal">
                  {label}
                </FieldLabel>
              </Field>
            ))}
          </FieldGroup>
        </Demo>
        <Demo name="Table (select all)">
          <div className="w-full space-y-2 text-sm">
            <Field orientation="horizontal">
              <Checkbox
                checked={
                  tableSelect.size === ROWS.length
                    ? true
                    : tableSelect.size === 0
                      ? false
                      : "indeterminate"
                }
                onCheckedChange={(v) => setTableSelect(v === true ? new Set(ROWS) : new Set())}
              />
              <span className="font-medium">Select all</span>
            </Field>
            {ROWS.map((label) => (
              <Field key={label} orientation="horizontal">
                <Checkbox
                  checked={tableSelect.has(label)}
                  onCheckedChange={(v) =>
                    setTableSelect((s) => {
                      const next = new Set(s);
                      if (v === true) next.add(label);
                      else next.delete(label);
                      return next;
                    })
                  }
                />
                <FieldLabel className="font-normal">{label}</FieldLabel>
              </Field>
            ))}
          </div>
        </Demo>
      </Section>

      <Section
        id="combobox"
        title="Combobox"
        description="Autocomplete input with a list of suggestions."
      >
        <Demo name="Basic">
          <Combobox value={combo} onValueChange={(v) => setCombo(v ?? "")}>
            <ComboboxTrigger className="flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
              <ComboboxValue placeholder="Select framework" />
            </ComboboxTrigger>
            <ComboboxContent>
              <ComboboxInput placeholder="Search framework" />
              <ComboboxList>
                <ComboboxEmpty>No framework found.</ComboboxEmpty>
                {FRAMEWORKS.map((f) => (
                  <ComboboxItem key={f.value} value={f.value}>
                    {f.label}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Demo>
        <Demo name="Multiple (chips)">
          <Combobox
            value={comboMulti}
            onValueChange={(v) => setComboMulti(Array.isArray(v) ? v : [])}
            multiple
            autoHighlight
          >
            <ComboboxChips className="w-full">
              {comboMulti.map((v) => (
                <ComboboxChip key={v}>
                  {FRAMEWORKS.find((f) => f.value === v)?.label ?? v}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="Pick frameworks..." />
            </ComboboxChips>
            <ComboboxContent>
              <ComboboxList>
                <ComboboxEmpty>No match.</ComboboxEmpty>
                {FRAMEWORKS.map((f) => (
                  <ComboboxItem key={f.value} value={f.value}>
                    {f.label}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Demo>
        <Demo name="Clear button">
          <Combobox value={combo} onValueChange={(v) => setCombo(v ?? "")}>
            <InputGroup className="w-full">
              <ComboboxInput placeholder="Search..." />
              {combo && (
                <InputGroupAddon align="inline-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    className="size-6"
                    aria-label="clear"
                    onClick={() => setCombo("")}
                  >
                    ×
                  </Button>
                </InputGroupAddon>
              )}
            </InputGroup>
            <ComboboxContent>
              <ComboboxList>
                <ComboboxEmpty>No match.</ComboboxEmpty>
                {FRAMEWORKS.map((f) => (
                  <ComboboxItem key={f.value} value={f.value}>
                    {f.label}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Demo>
        <Demo name="Groups">
          <Combobox value={comboGroups} onValueChange={(v) => setComboGroups(v ?? "")}>
            <ComboboxTrigger className="flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
              <ComboboxValue placeholder="Select tool" />
            </ComboboxTrigger>
            <ComboboxContent>
              <ComboboxInput placeholder="Search..." />
              <ComboboxList>
                <ComboboxGroup>
                  <ComboboxLabel>Frontend</ComboboxLabel>
                  <ComboboxItem value="next">Next.js</ComboboxItem>
                  <ComboboxItem value="vite">Vite</ComboboxItem>
                </ComboboxGroup>
                <ComboboxSeparator />
                <ComboboxGroup>
                  <ComboboxLabel>Backend</ComboboxLabel>
                  <ComboboxItem value="nest">NestJS</ComboboxItem>
                  <ComboboxItem value="hono">Hono</ComboboxItem>
                </ComboboxGroup>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Demo>
        <Demo name="Invalid">
          <Combobox>
            <ComboboxTrigger
              aria-invalid
              className="flex h-9 w-full items-center justify-between gap-2 rounded-md border border-destructive bg-transparent px-3 py-1 text-sm shadow-sm"
            >
              <ComboboxValue placeholder="Pick one" />
            </ComboboxTrigger>
          </Combobox>
        </Demo>
        <Demo name="Disabled">
          <Combobox disabled>
            <ComboboxTrigger className="flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-sm opacity-50 shadow-sm">
              <ComboboxValue placeholder="Disabled" />
            </ComboboxTrigger>
          </Combobox>
        </Demo>
        <Demo name="Input Group">
          <Combobox>
            <InputGroup className="w-full">
              <InputGroupAddon>
                <GlobeIcon />
              </InputGroupAddon>
              <ComboboxInput placeholder="Timezone..." />
            </InputGroup>
            <ComboboxContent>
              <ComboboxList>
                <ComboboxItem value="utc">UTC</ComboboxItem>
                <ComboboxItem value="prague">Europe/Prague</ComboboxItem>
                <ComboboxItem value="ny">America/New York</ComboboxItem>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Demo>
        <Demo name="Custom Items">
          <Combobox value={combo} onValueChange={(v) => setCombo(v ?? "")}>
            <ComboboxTrigger className="flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
              <ComboboxValue placeholder="Select assignee" />
            </ComboboxTrigger>
            <ComboboxContent>
              <ComboboxInput placeholder="Search..." />
              <ComboboxList>
                <ComboboxEmpty>No match.</ComboboxEmpty>
                {FRAMEWORKS.slice(0, 4).map((f) => (
                  <ComboboxItem key={f.value} value={f.value}>
                    <span className="grid size-6 place-items-center rounded-full bg-muted text-xs font-medium">
                      {f.label.slice(0, 1)}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm">{f.label}</span>
                      <span className="text-xs text-muted-foreground">{f.value}@team.dev</span>
                    </div>
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Demo>
        <Demo name="Auto Highlight">
          <Combobox value={combo} onValueChange={(v) => setCombo(v ?? "")} autoHighlight>
            <ComboboxTrigger className="flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
              <ComboboxValue placeholder="Auto-highlight first" />
            </ComboboxTrigger>
            <ComboboxContent>
              <ComboboxInput placeholder="Type to filter..." />
              <ComboboxList>
                <ComboboxEmpty>No match.</ComboboxEmpty>
                {FRAMEWORKS.map((f) => (
                  <ComboboxItem key={f.value} value={f.value}>
                    {f.label}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Demo>
        <Demo name="Popup">
          <Combobox value={combo} onValueChange={(v) => setCombo(v ?? "")}>
            <ComboboxInput
              placeholder="Search frameworks..."
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            />
            <ComboboxContent>
              <ComboboxList>
                <ComboboxEmpty>No match.</ComboboxEmpty>
                {FRAMEWORKS.map((f) => (
                  <ComboboxItem key={f.value} value={f.value}>
                    {f.label}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Demo>
      </Section>

      <Section
        id="date-picker"
        title="Date Picker"
        description="A date picker component with range and presets."
      >
        <Demo name="Basic">
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
        <Demo name="Range Picker">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start font-normal">
                <CalendarIcon />{" "}
                {dateRange?.from
                  ? dateRange.to
                    ? `${dateRange.from.toDateString()} → ${dateRange.to.toDateString()}`
                    : dateRange.from.toDateString()
                  : "Pick a range"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                numberOfMonths={2}
                selected={dateRange}
                onSelect={setDateRange}
              />
            </PopoverContent>
          </Popover>
        </Demo>
        <Demo name="Date of birth (dropdown caption)">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start font-normal">
                <CalendarIcon /> {dob ? dob.toDateString() : "Date of birth"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" captionLayout="dropdown" selected={dob} onSelect={setDob} />
            </PopoverContent>
          </Popover>
        </Demo>
        <Demo name="Input + calendar">
          <div className="flex w-full gap-2">
            <Input
              type="date"
              value={date ? date.toISOString().slice(0, 10) : ""}
              onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : undefined)}
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" aria-label="open">
                  <CalendarIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
          </div>
        </Demo>
        <Demo name="Time picker">
          <div className="w-full space-y-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start font-normal">
                  <CalendarIcon /> {date ? date.toDateString() : "Pick date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
            <Input type="time" defaultValue="14:30" />
          </div>
        </Demo>
        <Demo name="Natural language input">
          <div className="w-full space-y-2">
            <Input
              value={naturalText}
              onChange={(e) => setNaturalText(e.target.value)}
              placeholder="Try: tomorrow, next monday, in 3 days"
            />
            <p className="text-xs text-muted-foreground">
              Demo only. In production parse with{" "}
              <code className="rounded bg-muted px-1">chrono-node</code>.
            </p>
          </div>
        </Demo>
      </Section>

      <Section
        id="field"
        title="Field"
        description="Combine labels, controls, and help text to compose accessible form fields."
      >
        <Demo name="Input">
          <Field>
            <FieldLabel htmlFor="f-user">Username</FieldLabel>
            <Input id="f-user" placeholder="hlebtkachenko" />
            <FieldDescription>Public on your profile.</FieldDescription>
          </Field>
        </Demo>
        <Demo name="Textarea">
          <Field>
            <FieldLabel htmlFor="f-feedback">Feedback</FieldLabel>
            <Textarea id="f-feedback" placeholder="Type something..." rows={4} />
          </Field>
        </Demo>
        <Demo name="Select">
          <Field>
            <FieldLabel htmlFor="f-dept">Department</FieldLabel>
            <Select>
              <SelectTrigger id="f-dept" className="w-full">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eng">Engineering</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="ops">Operations</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </Demo>
        <Demo name="Slider (price range)">
          <Field>
            <FieldLabel>Price range</FieldLabel>
            <Slider value={range} onValueChange={setRange} min={0} max={1000} step={10} />
            <FieldDescription>
              ${range[0]} – ${range[1]}
            </FieldDescription>
          </Field>
        </Demo>
        <Demo name="Fieldset (address grid)">
          <FieldSet>
            <FieldLegend>Address</FieldLegend>
            <FieldGroup className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel>City</FieldLabel>
                <Input placeholder="Prague" />
              </Field>
              <Field>
                <FieldLabel>Postcode</FieldLabel>
                <Input placeholder="11000" />
              </Field>
              <Field className="col-span-2">
                <FieldLabel>Street</FieldLabel>
                <Input placeholder="Wenceslas Square 1" />
              </Field>
            </FieldGroup>
          </FieldSet>
        </Demo>
        <Demo name="Checkbox">
          <FieldGroup className="w-full">
            <Field orientation="horizontal">
              <Checkbox defaultChecked />
              <FieldLabel className="font-normal">Email notifications</FieldLabel>
            </Field>
            <FieldSeparator />
            <Field orientation="horizontal">
              <Checkbox />
              <FieldLabel className="font-normal">SMS notifications</FieldLabel>
            </Field>
          </FieldGroup>
        </Demo>
        <Demo name="Radio">
          <RadioGroup defaultValue="pro">
            {[
              { v: "free", t: "Free" },
              { v: "pro", t: "Pro" },
              { v: "ent", t: "Enterprise" },
            ].map(({ v, t }) => (
              <Field key={v} orientation="horizontal">
                <RadioGroupItem id={`fr-${v}`} value={v} />
                <FieldLabel htmlFor={`fr-${v}`} className="font-normal">
                  {t}
                </FieldLabel>
              </Field>
            ))}
          </RadioGroup>
        </Demo>
        <Demo name="Switch (MFA)">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Two-factor authentication</FieldTitle>
              <FieldDescription>Add an extra layer of security with TOTP.</FieldDescription>
            </FieldContent>
            <Switch defaultChecked />
          </Field>
        </Demo>
        <Demo name="Choice card">
          <RadioGroup defaultValue="k8s">
            <div className="grid w-full gap-2">
              {[
                { v: "k8s", t: "Kubernetes", d: "Auto-scale on Linode/Vultr." },
                { v: "vm", t: "Virtual machine", d: "Run on a single VPS." },
              ].map(({ v, t, d }) => (
                <Field
                  key={v}
                  orientation="horizontal"
                  className="rounded-md border border-border p-3 has-[[data-state=checked]]:border-primary"
                >
                  <RadioGroupItem id={`cc-${v}`} value={v} />
                  <FieldContent>
                    <FieldTitle>{t}</FieldTitle>
                    <FieldDescription>{d}</FieldDescription>
                  </FieldContent>
                </Field>
              ))}
            </div>
          </RadioGroup>
        </Demo>
        <Demo name="Field group (with separator)">
          <FieldGroup className="w-full">
            <Field orientation="horizontal">
              <Switch defaultChecked />
              <FieldLabel className="font-normal">Email notifications</FieldLabel>
            </Field>
            <FieldSeparator />
            <Field orientation="horizontal">
              <Switch />
              <FieldLabel className="font-normal">Push notifications</FieldLabel>
            </Field>
          </FieldGroup>
        </Demo>
      </Section>

      <Section
        id="input"
        title="Input"
        description="A text input component for forms and user data entry."
      >
        <Demo name="Basic">
          <Input placeholder="Enter text" />
        </Demo>
        <Demo name="Field">
          <Field>
            <FieldLabel htmlFor="email-1">Email</FieldLabel>
            <Input id="email-1" type="email" placeholder="m@example.com" />
            <FieldDescription>We&apos;ll never share it.</FieldDescription>
          </Field>
        </Demo>
        <Demo name="Field group">
          <FieldGroup className="w-full">
            <Field>
              <FieldLabel>First</FieldLabel>
              <Input placeholder="Jane" />
            </Field>
            <Field>
              <FieldLabel>Last</FieldLabel>
              <Input placeholder="Doe" />
            </Field>
          </FieldGroup>
        </Demo>
        <Demo name="Disabled">
          <Input disabled placeholder="Disabled" />
        </Demo>
        <Demo name="Invalid">
          <Field data-invalid>
            <FieldLabel className="text-destructive">Email</FieldLabel>
            <Input
              type="email"
              aria-invalid
              defaultValue="not-an-email"
              className="border-destructive"
            />
            <FieldError>Enter a valid email address.</FieldError>
          </Field>
        </Demo>
        <Demo name="File">
          <Field>
            <FieldLabel htmlFor="picture">Picture</FieldLabel>
            <Input id="picture" type="file" />
          </Field>
        </Demo>
        <Demo name="Inline (horizontal)">
          <Field orientation="horizontal">
            <FieldLabel>Search</FieldLabel>
            <Input placeholder="..." />
            <Button>Go</Button>
          </Field>
        </Demo>
        <Demo name="Grid (two-column)">
          <FieldGroup className="grid w-full grid-cols-2 gap-3">
            <Field>
              <FieldLabel>First</FieldLabel>
              <Input placeholder="Jane" />
            </Field>
            <Field>
              <FieldLabel>Last</FieldLabel>
              <Input placeholder="Doe" />
            </Field>
          </FieldGroup>
        </Demo>
        <Demo name="Required">
          <Field>
            <FieldLabel>
              Name <span className="text-destructive">*</span>
            </FieldLabel>
            <Input required placeholder="Required" />
          </Field>
        </Demo>
        <Demo name="Badge label">
          <Field>
            <div className="flex items-center gap-2">
              <FieldLabel>API key</FieldLabel>
              <Badge variant="secondary">Beta</Badge>
            </div>
            <Input placeholder="sk-..." />
          </Field>
        </Demo>
        <Demo name="Input Group">
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search..." />
          </InputGroup>
        </Demo>
        <Demo name="Button Group">
          <ButtonGroup>
            <Input placeholder="Email address" type="email" />
            <Button>Subscribe</Button>
          </ButtonGroup>
        </Demo>
        <Demo name="Form">
          <form className="grid w-full gap-3">
            <Field>
              <FieldLabel htmlFor="form-name">Name</FieldLabel>
              <Input id="form-name" placeholder="Jane Doe" />
            </Field>
            <Field>
              <FieldLabel htmlFor="form-email">Email</FieldLabel>
              <Input id="form-email" type="email" placeholder="m@example.com" />
            </Field>
            <Button type="submit">Submit</Button>
          </form>
        </Demo>
      </Section>

      <Section
        id="input-group"
        title="Input Group"
        description="Add addons, buttons, and helper content to inputs."
      >
        <Demo name="Icon (search / mail)">
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search projects..." />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <MailIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="m@example.com" />
          </InputGroup>
        </Demo>
        <Demo name="Text (currency / URL / @)">
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>$</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="0.00" type="number" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>USD</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>https://</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="acme.com" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <AtSignIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="hlebtkachenko" />
          </InputGroup>
        </Demo>
        <Demo name="Button (copy)">
          <InputGroup>
            <InputGroupInput defaultValue="sk_live_…42" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton aria-label="copy">
                <CopyIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Demo>
        <Demo name="Kbd shortcut">
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
        <Demo name="Spinner (loading)">
          <InputGroup>
            <InputGroupInput placeholder="Searching..." />
            <InputGroupAddon align="inline-end">
              <Spinner />
            </InputGroupAddon>
          </InputGroup>
        </Demo>
        <Demo name="Textarea + footer">
          <InputGroup>
            <InputGroupTextarea placeholder="Type your message..." />
            <InputGroupAddon align="block-end">
              <InputGroupText className="ml-auto text-xs">0 / 280</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Demo>
        <Demo name="Credit card">
          <InputGroup>
            <InputGroupAddon>
              <CreditCardIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="4242 4242 4242 4242" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="xs" variant="ghost">
                Verify
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Demo>
        <Demo name="Locked password (show toggle)">
          <Field>
            <FieldLabel htmlFor="pw-locked">Master password</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <LockIcon />
              </InputGroupAddon>
              <InputGroupInput
                id="pw-locked"
                type={showPassword ? "text" : "password"}
                defaultValue="hunter2-secret"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  size="xs"
                  variant="ghost"
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? "Hide" : "Show"}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </Demo>
        <Demo name="Dropdown">
          <InputGroup>
            <InputGroupAddon>
              <FileTextIcon />
            </InputGroupAddon>
            <InputGroupInput defaultValue="release-notes.md" />
            <InputGroupAddon align="inline-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <InputGroupButton size="xs" variant="ghost" aria-label="more actions">
                    <MoreHorizontalIcon />
                  </InputGroupButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Rename</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </InputGroupAddon>
          </InputGroup>
        </Demo>
        <Demo name="Custom Input">
          <InputGroup>
            <InputGroupTextarea
              placeholder="Auto-resizes as you type..."
              rows={1}
              className="resize-none"
            />
            <InputGroupAddon align="block-end">
              <Button size="sm" className="ml-auto">
                Send
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Demo>
      </Section>

      <Section
        id="input-otp"
        title="Input OTP"
        description="Accessible one-time password component with copy-paste functionality."
      >
        <Demo name="Default 6 digits">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </Demo>
        <Demo name="Separator">
          <InputOTP maxLength={6}>
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
        <Demo name="Disabled">
          <InputOTP maxLength={4} disabled value="1234" onChange={() => {}}>
            <InputOTPGroup>
              {[0, 1, 2, 3].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </Demo>
        <Demo name="Controlled">
          <div className="space-y-2">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <p className="text-xs text-muted-foreground">Value: {otp}</p>
          </div>
        </Demo>
        <Demo name="Invalid">
          <InputOTP maxLength={4} value="12" onChange={() => {}}>
            <InputOTPGroup>
              {[0, 1, 2, 3].map((i) => (
                <InputOTPSlot key={i} index={i} aria-invalid />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </Demo>
        <Demo name="Four digits">
          <InputOTP maxLength={4}>
            <InputOTPGroup>
              {[0, 1, 2, 3].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </Demo>
        <Demo name="Alphanumeric">
          <InputOTP maxLength={6} pattern="^[A-Z0-9]+$">
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </Demo>
        <Demo name="Form (verification)">
          <Field>
            <FieldLabel>Verification code</FieldLabel>
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <FieldDescription>
              Sent to m@example.com.{" "}
              <Button variant="link" size="sm" className="h-auto p-0" type="button">
                Resend
              </Button>
            </FieldDescription>
          </Field>
        </Demo>
      </Section>

      <Section
        id="label"
        title="Label"
        description="Renders an accessible label associated with controls."
      >
        <Demo name="Default">
          <div className="flex items-center gap-2">
            <Checkbox id="lb-1" defaultChecked />
            <Label htmlFor="lb-1">Accept terms and conditions</Label>
          </div>
        </Demo>
        <Demo name="In Field component">
          <div className="grid w-full gap-2">
            <Label htmlFor="lb-pw">Your password</Label>
            <Input id="lb-pw" type="password" />
          </div>
        </Demo>
      </Section>

      <Section
        id="native-select"
        title="Native Select"
        description="A styled native HTML select element."
      >
        <Demo name="Default">
          <NativeSelect>
            <NativeSelectOption value="apple">Apple</NativeSelectOption>
            <NativeSelectOption value="banana">Banana</NativeSelectOption>
            <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
          </NativeSelect>
        </Demo>
        <Demo name="Groups">
          <NativeSelect>
            <NativeSelectOptGroup label="Citrus">
              <NativeSelectOption value="orange">Orange</NativeSelectOption>
              <NativeSelectOption value="lemon">Lemon</NativeSelectOption>
            </NativeSelectOptGroup>
            <NativeSelectOptGroup label="Berries">
              <NativeSelectOption value="strawberry">Strawberry</NativeSelectOption>
              <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
            </NativeSelectOptGroup>
          </NativeSelect>
        </Demo>
        <Demo name="Disabled">
          <NativeSelect disabled>
            <NativeSelectOption value="x">Disabled</NativeSelectOption>
          </NativeSelect>
        </Demo>
        <Demo name="Invalid">
          <NativeSelect aria-invalid className="border-destructive">
            <NativeSelectOption value="x">Invalid</NativeSelectOption>
          </NativeSelect>
        </Demo>
      </Section>

      <Section
        id="radio-group"
        title="Radio Group"
        description="A set of checkable buttons where no more than one can be checked at a time."
      >
        <Demo name="Default">
          <RadioGroup defaultValue="comfortable">
            {["default", "comfortable", "compact"].map((v) => (
              <Field key={v} orientation="horizontal">
                <RadioGroupItem id={`r-${v}`} value={v} />
                <FieldLabel htmlFor={`r-${v}`} className="font-normal capitalize">
                  {v}
                </FieldLabel>
              </Field>
            ))}
          </RadioGroup>
        </Demo>
        <Demo name="Description">
          <RadioGroup defaultValue="pro">
            {[
              { v: "free", t: "Free", d: "1 user, 100 requests/day." },
              { v: "pro", t: "Pro", d: "5 users, 10k requests/day." },
              { v: "ent", t: "Enterprise", d: "Unlimited, with SSO." },
            ].map(({ v, t, d }) => (
              <Field key={v} orientation="horizontal">
                <RadioGroupItem id={`rd-${v}`} value={v} />
                <FieldContent>
                  <FieldTitle>{t}</FieldTitle>
                  <FieldDescription>{d}</FieldDescription>
                </FieldContent>
              </Field>
            ))}
          </RadioGroup>
        </Demo>
        <Demo name="Choice card">
          <RadioGroup defaultValue="k8s">
            <div className="grid w-full gap-2">
              {[
                { v: "k8s", t: "Kubernetes" },
                { v: "vm", t: "Virtual machine" },
              ].map(({ v, t }) => (
                <Field
                  key={v}
                  orientation="horizontal"
                  className="rounded-md border border-border p-3 has-[[data-state=checked]]:border-primary"
                >
                  <RadioGroupItem id={`rc-${v}`} value={v} />
                  <FieldLabel htmlFor={`rc-${v}`} className="font-normal">
                    {t}
                  </FieldLabel>
                </Field>
              ))}
            </div>
          </RadioGroup>
        </Demo>
        <Demo name="Fieldset (pricing)">
          <FieldSet>
            <FieldLegend>Billing cadence</FieldLegend>
            <RadioGroup defaultValue="monthly">
              <Field orientation="horizontal">
                <RadioGroupItem id="bc-m" value="monthly" />
                <FieldLabel htmlFor="bc-m" className="font-normal">
                  Monthly · $20
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem id="bc-y" value="yearly" />
                <FieldLabel htmlFor="bc-y" className="font-normal">
                  Yearly · $200 (save $40)
                </FieldLabel>
              </Field>
            </RadioGroup>
          </FieldSet>
        </Demo>
        <Demo name="Disabled">
          <RadioGroup defaultValue="a">
            <Field orientation="horizontal">
              <RadioGroupItem id="rd-a" value="a" disabled />
              <FieldLabel htmlFor="rd-a" className="font-normal">
                Disabled
              </FieldLabel>
            </Field>
          </RadioGroup>
        </Demo>
        <Demo name="Invalid">
          <RadioGroup>
            <Field orientation="horizontal" data-invalid>
              <RadioGroupItem id="rd-b" value="b" className="border-destructive" />
              <FieldLabel htmlFor="rd-b" className="font-normal">
                Invalid choice
              </FieldLabel>
            </Field>
          </RadioGroup>
        </Demo>
      </Section>

      <Section
        id="select"
        title="Select"
        description="Displays a list of options for the user to pick from."
      >
        <Demo name="Default">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="cherry">Cherry</SelectItem>
            </SelectContent>
          </Select>
        </Demo>
        <Demo name="Align with trigger (popper)">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Aligned" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="a">Option A</SelectItem>
              <SelectItem value="b">Option B</SelectItem>
            </SelectContent>
          </Select>
        </Demo>
        <Demo name="Groups">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Europe</SelectLabel>
                <SelectItem value="europe/prague">Europe/Prague</SelectItem>
                <SelectItem value="europe/london">Europe/London</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Americas</SelectLabel>
                <SelectItem value="america/ny">America/New York</SelectItem>
                <SelectItem value="america/la">America/Los Angeles</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Demo>
        <Demo name="Scrollable">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pick a country" />
            </SelectTrigger>
            <SelectContent className="max-h-48">
              {Array.from({ length: 30 }, (_, i) => (
                <SelectItem key={i} value={`country-${i}`}>
                  Country {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Demo>
        <Demo name="Disabled">
          <Select disabled>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Disabled" />
            </SelectTrigger>
          </Select>
        </Demo>
        <Demo name="Invalid">
          <Select>
            <SelectTrigger aria-invalid className="w-full border-destructive">
              <SelectValue placeholder="Invalid" />
            </SelectTrigger>
          </Select>
        </Demo>
      </Section>

      <Section
        id="slider"
        title="Slider"
        description="An input where the user selects a value from within a given range."
      >
        <Demo name="Default">
          <Slider defaultValue={[50]} max={100} className="w-full" />
        </Demo>
        <Demo name="Range">
          <div className="w-full space-y-2">
            <Slider value={range} onValueChange={setRange} max={1000} step={5} />
            <p className="text-xs text-muted-foreground">
              {range[0]} – {range[1]}
            </p>
          </div>
        </Demo>
        <Demo name="Multiple thumbs">
          <Slider value={multi} onValueChange={setMulti} max={100} className="w-full" />
          <p className="text-xs text-muted-foreground">{multi.join(" · ")}</p>
        </Demo>
        <Demo name="Vertical">
          <Slider defaultValue={[60]} orientation="vertical" max={100} className="h-40" />
        </Demo>
        <Demo name="Controlled (precise)">
          <div className="w-full space-y-2">
            <Slider value={slider} onValueChange={setSlider} max={100} />
            <p className="text-xs text-muted-foreground">Value: {slider[0]}</p>
          </div>
        </Demo>
        <Demo name="Disabled">
          <Slider defaultValue={[40]} disabled max={100} className="w-full" />
        </Demo>
      </Section>

      <Section
        id="switch"
        title="Switch"
        description="A control that allows the user to toggle between checked and not checked."
      >
        <Demo name="Default">
          <Field orientation="horizontal">
            <Switch id="sw-1" defaultChecked />
            <FieldLabel htmlFor="sw-1" className="font-normal">
              Airplane mode
            </FieldLabel>
          </Field>
        </Demo>
        <Demo name="Description">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Two-factor authentication</FieldTitle>
              <FieldDescription>Extra security with TOTP.</FieldDescription>
            </FieldContent>
            <Switch defaultChecked />
          </Field>
        </Demo>
        <Demo name="Choice card">
          <div className="grid w-full gap-2">
            {[
              { id: "card-light", t: "Light theme" },
              { id: "card-dark", t: "Dark theme" },
            ].map(({ id, t }) => (
              <Field
                key={id}
                orientation="horizontal"
                className="rounded-md border border-border p-3"
              >
                <FieldLabel htmlFor={id} className="font-normal">
                  {t}
                </FieldLabel>
                <Switch id={id} />
              </Field>
            ))}
          </div>
        </Demo>
        <Demo name="Disabled">
          <Field orientation="horizontal">
            <Switch disabled defaultChecked />
            <FieldLabel className="font-normal">Disabled</FieldLabel>
          </Field>
        </Demo>
        <Demo name="Invalid">
          <Field orientation="horizontal" data-invalid>
            <Switch aria-invalid className="data-[state=unchecked]:bg-destructive/30" />
            <FieldLabel className="font-normal">Invalid</FieldLabel>
          </Field>
        </Demo>
        <Demo name="Sizes">
          <Field orientation="horizontal">
            <Switch className="scale-75" />
            <FieldLabel className="font-normal">Small</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Switch />
            <FieldLabel className="font-normal">Default</FieldLabel>
          </Field>
        </Demo>
      </Section>

      <Section id="textarea" title="Textarea" description="Displays a form textarea.">
        <Demo name="Default">
          <Textarea placeholder="Type something..." />
        </Demo>
        <Demo name="Field">
          <Field>
            <FieldLabel htmlFor="ta-msg">Message</FieldLabel>
            <Textarea id="ta-msg" placeholder="Type your message" rows={4} />
          </Field>
        </Demo>
        <Demo name="Disabled">
          <Textarea disabled placeholder="Disabled" />
        </Demo>
        <Demo name="Invalid">
          <Textarea aria-invalid defaultValue="Bad input" className="border-destructive" />
        </Demo>
        <Demo name="With submit">
          <div className="grid w-full gap-2">
            <Textarea placeholder="Reply..." rows={3} />
            <div className="flex justify-end">
              <Button size="sm">
                <Loader2Icon className="hidden animate-spin" /> Send
              </Button>
            </div>
          </div>
        </Demo>
      </Section>
    </>
  );
}
