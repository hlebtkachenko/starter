"use client";

import { CalendarIcon, ChevronDownIcon, BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { useState } from "react";

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
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
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

  return (
    <Section
      id="inputs"
      title="Inputs and forms"
      description="Text, choice, slider, OTP, calendar, combobox."
    >
      <Demo name="Button — variants and sizes">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="open">
          <ChevronDownIcon />
        </Button>
        <Button disabled>Disabled</Button>
      </Demo>

      <Demo name="Input + Label">
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="email-demo">Email</Label>
          <Input id="email-demo" type="email" placeholder="m@example.com" />
        </div>
      </Demo>

      <Demo name="Textarea">
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" placeholder="Tell us about yourself" />
        </div>
      </Demo>

      <Demo name="Field group">
        <FieldGroup className="max-w-sm">
          <Field>
            <FieldLabel htmlFor="full-name">Full name</FieldLabel>
            <Input id="full-name" placeholder="Jane Doe" />
            <FieldDescription>Shown on your profile.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="role">Role</FieldLabel>
            <Input id="role" placeholder="Engineer" />
          </Field>
        </FieldGroup>
      </Demo>

      <Demo name="Checkbox">
        <div className="flex items-center gap-2">
          <Checkbox id="terms" defaultChecked />
          <Label htmlFor="terms">Accept terms and conditions</Label>
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
        </RadioGroup>
      </Demo>

      <Demo name="Switch">
        <div className="flex items-center gap-2">
          <Switch id="airplane" />
          <Label htmlFor="airplane">Airplane mode</Label>
        </div>
      </Demo>

      <Demo name="Select">
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
          </SelectContent>
        </Select>
      </Demo>

      <Demo name="Combobox">
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

      <Demo name="Slider">
        <div className="w-full max-w-sm">
          <Slider value={slider} onValueChange={setSlider} max={100} step={1} />
          <p className="mt-2 text-xs text-muted-foreground">Value: {slider[0]}</p>
        </div>
      </Demo>

      <Demo name="Toggle and toggle group">
        <Toggle aria-label="Bold">
          <BoldIcon />
        </Toggle>
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

      <Demo name="Input OTP">
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </Demo>

      <Demo name="Calendar (inline)">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-[var(--radius)] border border-border"
        />
      </Demo>

      <Demo name="Date picker (calendar in popover)">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[220px] justify-start font-normal">
              <CalendarIcon /> {date ? date.toLocaleDateString() : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>
      </Demo>
    </Section>
  );
}
