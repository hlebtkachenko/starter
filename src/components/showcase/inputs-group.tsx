"use client";

import {
  AtSignIcon,
  BoldIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  CopyIcon,
  CreditCardIcon,
  ItalicIcon,
  Loader2Icon,
  LockIcon,
  MailIcon,
  MoreHorizontalIcon,
  RotateCcwIcon,
  SearchIcon,
  StarIcon,
  UnderlineIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
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
import { cn } from "@/lib/utils";

import { Demo, Section } from "./section";

const FRAMEWORKS = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "qwik", label: "Qwik" },
  { value: "solid", label: "Solid" },
];

const TIMEZONES = [
  { value: "utc", label: "UTC" },
  { value: "europe/prague", label: "Europe/Prague" },
  { value: "europe/london", label: "Europe/London" },
  { value: "america/new_york", label: "America/New York" },
  { value: "asia/tokyo", label: "Asia/Tokyo" },
  { value: "australia/sydney", label: "Australia/Sydney" },
];

export function InputsGroup() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [otp, setOtp] = useState("");
  const [otpAlpha, setOtpAlpha] = useState("");
  const [combo, setCombo] = useState("");
  const [comboMulti, setComboMulti] = useState<string[]>(["next.js", "remix"]);
  const [slider, setSlider] = useState([50]);
  const [range, setRange] = useState([20, 80]);
  const [multi, setMulti] = useState([20, 50, 80]);
  const [vertical, setVertical] = useState([60]);
  const [controlled, setControlled] = useState([33]);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Section
      id="inputs"
      title="Inputs and forms"
      description="Buttons, fields, choice, slider, OTP, calendar, combobox, plus input groups."
    >
      {/* Button */}
      <Demo name="Button — variants">
        <Button>Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
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

      <Demo name="Button — with icon, spinner, disabled">
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

      <Demo name="Button — rounded">
        <Button className="rounded-full">Pill</Button>
        <Button variant="outline" className="rounded-full">
          Pill outline
        </Button>
        <Button size="icon" className="rounded-full" aria-label="more">
          <MoreHorizontalIcon />
        </Button>
      </Demo>

      <Demo name="Button — group">
        <div className="inline-flex rounded-[var(--radius)] shadow-sm">
          <Button variant="outline" className="rounded-r-none">
            Day
          </Button>
          <Button variant="outline" className="rounded-none border-l-0">
            Week
          </Button>
          <Button variant="outline" className="rounded-l-none border-l-0">
            Month
          </Button>
        </div>
      </Demo>

      <Demo name="Button — asChild">
        <Button asChild>
          <a href="#" aria-label="Read docs">
            <ChevronRightIcon /> Read docs
          </a>
        </Button>
      </Demo>

      {/* Input */}
      <Demo name="Input — basic">
        <Input type="email" placeholder="m@example.com" />
      </Demo>

      <Demo name="Input — with field">
        <Field>
          <FieldLabel htmlFor="email-1">Email</FieldLabel>
          <Input id="email-1" type="email" placeholder="m@example.com" />
          <FieldDescription>We&apos;ll never share it.</FieldDescription>
        </Field>
      </Demo>

      <Demo name="Input — disabled / readonly">
        <Input disabled placeholder="Disabled" />
        <Input readOnly defaultValue="Read only value" />
      </Demo>

      <Demo name="Input — invalid">
        <Field data-invalid>
          <FieldLabel htmlFor="email-x" className="text-destructive">
            Email
          </FieldLabel>
          <Input
            id="email-x"
            type="email"
            aria-invalid
            defaultValue="not-an-email"
            className="border-destructive"
          />
          <FieldError>Enter a valid email address.</FieldError>
        </Field>
      </Demo>

      <Demo name="Input — required">
        <Field>
          <FieldLabel htmlFor="name-r">
            Name <span className="text-destructive">*</span>
          </FieldLabel>
          <Input id="name-r" required placeholder="Required" />
        </Field>
      </Demo>

      <Demo name="Input — file">
        <Field>
          <FieldLabel htmlFor="picture">Picture</FieldLabel>
          <Input id="picture" type="file" />
        </Field>
      </Demo>

      <Demo name="Input — number / search / password">
        <Input type="number" placeholder="0" min={0} max={100} />
        <Input type="search" placeholder="Search..." />
        <Input type="password" placeholder="••••••••" />
      </Demo>

      <Demo name="Input — inline (horizontal)">
        <Field orientation="horizontal">
          <FieldLabel htmlFor="port">Port</FieldLabel>
          <Input id="port" type="number" defaultValue={3000} className="w-20" />
        </Field>
      </Demo>

      <Demo name="Input — grid (two-column)">
        <FieldGroup className="grid w-full grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="first">First</FieldLabel>
            <Input id="first" placeholder="Jane" />
          </Field>
          <Field>
            <FieldLabel htmlFor="last">Last</FieldLabel>
            <Input id="last" placeholder="Doe" />
          </Field>
        </FieldGroup>
      </Demo>

      <Demo name="Input — with badge label">
        <Field>
          <div className="flex items-center gap-2">
            <FieldLabel htmlFor="api-key">API key</FieldLabel>
            <Badge variant="secondary">Pro</Badge>
          </div>
          <Input id="api-key" placeholder="sk-..." />
        </Field>
      </Demo>

      {/* Input Group */}
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
          <InputGroupInput defaultValue="sk_live_…42" />
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

      <Demo name="Input group — block-end addon">
        <InputGroup>
          <InputGroupTextarea placeholder="Type your message..." />
          <InputGroupAddon align="block-end">
            <InputGroupText className="ml-auto text-xs">0 / 280</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Demo>

      <Demo name="Input group — button row">
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

      <Demo name="Field — responsive">
        <Field orientation="responsive">
          <FieldLabel htmlFor="resp">Responsive</FieldLabel>
          <Input id="resp" placeholder="vertical → horizontal at md" />
        </Field>
      </Demo>

      <Demo name="Field — multiple errors">
        <Field data-invalid>
          <FieldLabel htmlFor="zip-i" className="text-destructive">
            Postcode
          </FieldLabel>
          <Input id="zip-i" defaultValue="abc" className="border-destructive" />
          <FieldError
            errors={[{ message: "Must be numeric." }, { message: "Must be 5 digits." }]}
          />
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

      <Demo name="Field — title + description (label legend)">
        <FieldSet>
          <FieldLegend variant="label">Privacy</FieldLegend>
          <FieldDescription>Control who can see your profile.</FieldDescription>
          <RadioGroup defaultValue="public" className="mt-2">
            <Field orientation="horizontal">
              <RadioGroupItem id="p-pub" value="public" />
              <FieldLabel htmlFor="p-pub" className="font-normal">
                Public
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <RadioGroupItem id="p-priv" value="private" />
              <FieldLabel htmlFor="p-priv" className="font-normal">
                Private
              </FieldLabel>
            </Field>
          </RadioGroup>
        </FieldSet>
      </Demo>

      <Demo name="FieldContent + FieldTitle">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Beta features</FieldTitle>
            <FieldDescription>Try experimental things before public release.</FieldDescription>
          </FieldContent>
          <Switch />
        </Field>
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
          <FieldSeparator>Account</FieldSeparator>
          <Field>
            <FieldLabel htmlFor="pw-2">Password</FieldLabel>
            <Input id="pw-2" type="password" />
          </Field>
        </FieldGroup>
      </Demo>

      {/* Label */}
      <Demo name="Label — basic">
        <div className="flex items-center gap-2">
          <Checkbox id="l-terms" defaultChecked />
          <Label htmlFor="l-terms">Accept terms and conditions</Label>
        </div>
      </Demo>

      <Demo name="Label — basic usage">
        <div className="grid w-full gap-2">
          <Label htmlFor="l-pw">Your password</Label>
          <Input id="l-pw" type="password" />
        </div>
      </Demo>

      {/* Textarea */}
      <Demo name="Textarea — field">
        <Field>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea id="message" placeholder="Type your message" />
        </Field>
      </Demo>

      <Demo name="Textarea — disabled / invalid">
        <Textarea disabled placeholder="Disabled" />
        <Textarea aria-invalid defaultValue="Bad input" className="border-destructive" />
      </Demo>

      <Demo name="Textarea — with submit button">
        <div className="grid w-full gap-2">
          <Textarea placeholder="Reply..." rows={3} />
          <div className="flex justify-end">
            <Button size="sm">Send</Button>
          </div>
        </div>
      </Demo>

      {/* Checkbox */}
      <Demo name="Checkbox — states">
        <div className="space-y-2">
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
        </div>
      </Demo>

      <Demo name="Checkbox — with description">
        <Field orientation="horizontal">
          <Checkbox id="c-tos" />
          <FieldContent>
            <FieldTitle>Marketing emails</FieldTitle>
            <FieldDescription>Receive emails about new products and updates.</FieldDescription>
          </FieldContent>
        </Field>
      </Demo>

      <Demo name="Checkbox — group">
        <FieldGroup>
          {["Recents", "Home", "Applications", "Documents"].map((label) => (
            <Field key={label} orientation="horizontal">
              <Checkbox id={`cg-${label}`} defaultChecked={label === "Home"} />
              <FieldLabel htmlFor={`cg-${label}`} className="font-normal">
                {label}
              </FieldLabel>
            </Field>
          ))}
        </FieldGroup>
      </Demo>

      {/* Radio group */}
      <Demo name="Radio group — default">
        <RadioGroup defaultValue="comfortable">
          {(["default", "comfortable", "compact"] as const).map((v) => (
            <Field key={v} orientation="horizontal">
              <RadioGroupItem id={`r-${v}`} value={v} />
              <FieldLabel htmlFor={`r-${v}`} className="font-normal capitalize">
                {v}
              </FieldLabel>
            </Field>
          ))}
        </RadioGroup>
      </Demo>

      <Demo name="Radio group — with description">
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

      <Demo name="Radio group — disabled / invalid">
        <RadioGroup defaultValue="a">
          <Field orientation="horizontal">
            <RadioGroupItem id="rd-a" value="a" disabled />
            <FieldLabel htmlFor="rd-a" className="font-normal">
              Disabled
            </FieldLabel>
          </Field>
        </RadioGroup>
        <RadioGroup defaultValue="b" data-invalid>
          <Field orientation="horizontal" data-invalid>
            <RadioGroupItem id="rd-b" value="b" className="border-destructive" />
            <FieldLabel htmlFor="rd-b" className="font-normal">
              Invalid choice
            </FieldLabel>
          </Field>
        </RadioGroup>
      </Demo>

      {/* Switch */}
      <Demo name="Switch — basic / disabled">
        <Field orientation="horizontal">
          <Switch id="s1" defaultChecked />
          <FieldLabel htmlFor="s1" className="font-normal">
            Airplane mode
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Switch id="s2" />
          <FieldLabel htmlFor="s2" className="font-normal">
            Off
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Switch id="s3" disabled defaultChecked />
          <FieldLabel htmlFor="s3" className="font-normal">
            Disabled
          </FieldLabel>
        </Field>
      </Demo>

      <Demo name="Switch — with description">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Two-factor authentication</FieldTitle>
            <FieldDescription>Add an extra layer of security with TOTP.</FieldDescription>
          </FieldContent>
          <Switch defaultChecked />
        </Field>
      </Demo>

      <Demo name="Switch — invalid">
        <Field orientation="horizontal" data-invalid>
          <Switch aria-invalid className="data-[state=unchecked]:bg-destructive/30" />
          <FieldLabel className="font-normal">Required toggle</FieldLabel>
        </Field>
      </Demo>

      {/* Select */}
      <Demo name="Select — basic">
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

      <Demo name="Select — groups">
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
              <SelectItem value="america/new_york">America/New York</SelectItem>
              <SelectItem value="america/los_angeles">America/Los Angeles</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Demo>

      <Demo name="Select — scrollable / disabled / invalid">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pick a TZ" />
          </SelectTrigger>
          <SelectContent className="max-h-48">
            {TIMEZONES.concat(TIMEZONES).map((tz, i) => (
              <SelectItem key={`${tz.value}-${i}`} value={`${tz.value}-${i}`}>
                {tz.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select disabled>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Disabled" />
          </SelectTrigger>
        </Select>
        <Select>
          <SelectTrigger aria-invalid className="w-full border-destructive">
            <SelectValue placeholder="Invalid" />
          </SelectTrigger>
        </Select>
      </Demo>

      {/* Combobox — Popover + Command pattern */}
      <Demo name="Combobox — basic">
        <ComboboxBox
          value={combo}
          onChange={(v) => setCombo(v as string)}
          items={FRAMEWORKS}
          placeholder="Select framework"
          emptyText="No framework found."
        />
      </Demo>

      <Demo name="Combobox — multiple (chips)">
        <ComboboxBox
          multiple
          value={comboMulti}
          onChange={(v) => setComboMulti(v as string[])}
          items={FRAMEWORKS}
          placeholder="Pick frameworks..."
          emptyText="No match."
        />
      </Demo>

      <Demo name="Combobox — groups">
        <ComboboxBox
          value={combo}
          onChange={(v) => setCombo(v as string)}
          placeholder="Select tool"
          emptyText="No tool found."
          groups={[
            {
              label: "Frontend",
              items: [
                { value: "next", label: "Next.js" },
                { value: "vite", label: "Vite" },
              ],
            },
            {
              label: "Backend",
              items: [
                { value: "nest", label: "NestJS" },
                { value: "hono", label: "Hono" },
              ],
            },
          ]}
        />
      </Demo>

      <Demo name="Combobox — disabled / invalid">
        <ComboboxBox
          disabled
          value=""
          onChange={() => {}}
          items={FRAMEWORKS}
          placeholder="Disabled"
        />
        <ComboboxBox
          invalid
          value=""
          onChange={() => {}}
          items={FRAMEWORKS}
          placeholder="Pick one (required)"
        />
      </Demo>

      {/* Slider */}
      <Demo name="Slider — default">
        <div className="w-full">
          <Slider defaultValue={[33]} max={100} step={1} />
        </div>
      </Demo>

      <Demo name="Slider — controlled">
        <div className="w-full space-y-2">
          <Slider value={controlled} onValueChange={setControlled} max={100} />
          <p className="text-xs text-muted-foreground">Value: {controlled[0]}</p>
        </div>
      </Demo>

      <Demo name="Slider — range">
        <div className="w-full">
          <Slider value={range} onValueChange={setRange} max={100} step={1} />
          <p className="mt-2 text-xs text-muted-foreground">
            {range[0]} – {range[1]}
          </p>
        </div>
      </Demo>

      <Demo name="Slider — multiple thumbs">
        <div className="w-full">
          <Slider value={multi} onValueChange={setMulti} max={100} step={1} />
          <p className="mt-2 text-xs text-muted-foreground">{multi.join(" · ")}</p>
        </div>
      </Demo>

      <Demo name="Slider — vertical">
        <Slider
          value={vertical}
          onValueChange={setVertical}
          max={100}
          orientation="vertical"
          className="h-40"
        />
        <Slider defaultValue={[40]} disabled max={100} className="w-full" />
      </Demo>

      {/* Toggle */}
      <Demo name="Toggle — variants">
        <Toggle aria-label="Bookmark">
          <StarIcon /> Bookmark
        </Toggle>
        <Toggle variant="outline" aria-label="Bold" defaultPressed>
          <BoldIcon />
        </Toggle>
        <Toggle aria-label="Italic" disabled>
          <ItalicIcon />
        </Toggle>
      </Demo>

      <Demo name="Toggle — sizes">
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

      <Demo name="Toggle — with text">
        <Toggle defaultPressed>
          <BoldIcon /> Bold
        </Toggle>
        <Toggle variant="outline">
          <ItalicIcon /> Italic
        </Toggle>
      </Demo>

      {/* Toggle group */}
      <Demo name="Toggle group — multiple">
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

      <Demo name="Toggle group — outline + sizes">
        <ToggleGroup type="single" variant="outline" defaultValue="left">
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="single" size="sm" defaultValue="b">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      </Demo>

      <Demo name="Toggle group — vertical / disabled">
        <ToggleGroup type="single" orientation="vertical" defaultValue="top" variant="outline">
          <ToggleGroupItem value="top">Top</ToggleGroupItem>
          <ToggleGroupItem value="middle">Middle</ToggleGroupItem>
          <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="single" disabled defaultValue="x">
          <ToggleGroupItem value="x">X</ToggleGroupItem>
          <ToggleGroupItem value="y">Y</ToggleGroupItem>
        </ToggleGroup>
      </Demo>

      {/* Input OTP */}
      <Demo name="Input OTP — 6 digits, separator">
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
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            {[0, 1, 2, 3].map((i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </Demo>

      <Demo name="Input OTP — alphanumeric / disabled / invalid">
        <InputOTP maxLength={6} value={otpAlpha} onChange={setOtpAlpha} pattern="^[A-Z0-9]+$">
          <InputOTPGroup>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <InputOTP maxLength={4} disabled>
          <InputOTPGroup>
            {[0, 1, 2, 3].map((i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </Demo>

      {/* Calendar */}
      <Demo name="Calendar — single" span={2} height="tall">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-[var(--radius)] border border-border"
        />
      </Demo>

      <Demo name="Calendar — month/year dropdown">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={date}
          onSelect={setDate}
          className="rounded-[var(--radius)] border border-border"
        />
      </Demo>

      <Demo name="Date picker (popover)">
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

      <Demo name="Date range picker" span={2} height="tall">
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

      <Demo name="Calendar — booked dates (disabled past)">
        <Calendar
          mode="single"
          disabled={(d) => d < new Date()}
          className="rounded-[var(--radius)] border border-border"
        />
      </Demo>

      <Demo name="Calendar — date and time">
        <div className="space-y-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-[var(--radius)] border border-border"
          />
          <Input type="time" defaultValue="14:30" />
        </div>
      </Demo>

      <Demo name="Calendar — presets">
        <div className="flex w-full flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setDate(new Date())}>
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const d = new Date();
              d.setDate(d.getDate() + 1);
              setDate(d);
            }}
          >
            Tomorrow
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const d = new Date();
              d.setDate(d.getDate() + 7);
              setDate(d);
            }}
          >
            In a week
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setDate(undefined)}>
            <RotateCcwIcon /> Reset
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Picked: {date ? date.toDateString() : "none"}
        </p>
      </Demo>

      {/* Field utility uses */}
      <Demo name="Field — locked password (icon group)">
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
          <FieldDescription>Min. 12 characters.</FieldDescription>
        </Field>
      </Demo>

      <Demo name="Field — at-sign mention">
        <InputGroup>
          <InputGroupAddon>
            <AtSignIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="hlebtkachenko" />
        </InputGroup>
      </Demo>

      {/* Slider control echo */}
      <Demo name="Slider — with input mirror">
        <div className="w-full space-y-2">
          <div className="flex items-center gap-3">
            <Slider value={slider} onValueChange={setSlider} max={100} />
            <Input
              type="number"
              value={slider[0]}
              onChange={(e) => setSlider([Number(e.target.value)])}
              className="w-20"
            />
          </div>
        </div>
      </Demo>
    </Section>
  );
}

type Item = { value: string; label: string };
type Group = { label: string; items: Item[] };

type ComboboxBoxProps = {
  value: string | string[];
  onChange: (v: string | string[]) => void;
  items?: Item[];
  groups?: Group[];
  placeholder: string;
  emptyText?: string;
  multiple?: boolean;
  disabled?: boolean;
  invalid?: boolean;
};

function ComboboxBox({
  value,
  onChange,
  items,
  groups,
  placeholder,
  emptyText = "No results.",
  multiple,
  disabled,
  invalid,
}: ComboboxBoxProps) {
  const [open, setOpen] = useState(false);
  const flatItems = items ?? groups?.flatMap((g) => g.items) ?? [];

  const labelFor = (v: string) => flatItems.find((i) => i.value === v)?.label ?? v;

  const selected = multiple
    ? Array.isArray(value)
      ? value
      : []
    : typeof value === "string"
      ? value
      : "";

  const triggerLabel = multiple
    ? Array.isArray(selected) && selected.length > 0
      ? `${selected.length} selected`
      : placeholder
    : selected
      ? labelFor(selected as string)
      : placeholder;

  const triggerHasValue = multiple
    ? Array.isArray(selected) && selected.length > 0
    : Boolean(selected);

  function toggle(v: string) {
    if (multiple) {
      const arr = Array.isArray(value) ? value : [];
      const next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
      onChange(next);
    } else {
      onChange(v === value ? "" : v);
      setOpen(false);
    }
  }

  return (
    <div className="w-full space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            disabled={disabled}
            aria-invalid={invalid}
            aria-expanded={open}
            className={cn(
              "w-full justify-between font-normal",
              invalid && "border-destructive",
              !triggerHasValue && "text-muted-foreground",
            )}
          >
            {triggerLabel}
            <ChevronsUpDownIcon className="ml-2 size-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandInput placeholder={`Search ${placeholder.toLowerCase()}`} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              {items && (
                <CommandGroup>
                  {items.map((item) => (
                    <ComboboxOption
                      key={item.value}
                      item={item}
                      multiple={multiple}
                      selected={selected}
                      onSelect={toggle}
                    />
                  ))}
                </CommandGroup>
              )}
              {groups?.map((g, i) => (
                <div key={g.label}>
                  {i > 0 && <CommandSeparator />}
                  <CommandGroup heading={g.label}>
                    {g.items.map((item) => (
                      <ComboboxOption
                        key={item.value}
                        item={item}
                        multiple={multiple}
                        selected={selected}
                        onSelect={toggle}
                      />
                    ))}
                  </CommandGroup>
                </div>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {multiple && Array.isArray(selected) && selected.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selected.map((v) => (
            <Badge key={v} variant="secondary" className="gap-1 pr-1">
              {labelFor(v)}
              <button
                type="button"
                aria-label={`Remove ${labelFor(v)}`}
                onClick={() => toggle(v)}
                className="rounded hover:bg-foreground/10"
              >
                <XIcon className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

function ComboboxOption({
  item,
  multiple,
  selected,
  onSelect,
}: {
  item: Item;
  multiple: boolean | undefined;
  selected: string | string[];
  onSelect: (v: string) => void;
}) {
  const isSelected = multiple
    ? Array.isArray(selected) && selected.includes(item.value)
    : selected === item.value;
  return (
    <CommandItem value={item.value} onSelect={() => onSelect(item.value)}>
      <CheckIcon className={cn("mr-2 size-4", isSelected ? "opacity-100" : "opacity-0")} />
      {item.label}
    </CommandItem>
  );
}
