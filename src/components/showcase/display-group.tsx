"use client";

import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  CheckCircle2Icon,
  GitBranchIcon,
  Loader2Icon,
  PlusIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Demo, Section } from "./section";

const INVOICES = [
  { id: "INV001", status: "Paid", method: "Credit Card", amount: 250 },
  { id: "INV002", status: "Pending", method: "PayPal", amount: 150 },
  { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: 350 },
  { id: "INV004", status: "Paid", method: "Stripe", amount: 450 },
];

const CHART_DATA = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 273, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
];

const CHART_CONFIG = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-3)" },
} satisfies ChartConfig;

const PAYMENTS = [
  { id: 1, status: "success", email: "ken99@yahoo.com", amount: 316.0 },
  { id: 2, status: "success", email: "abe45@gmail.com", amount: 242.0 },
  {
    id: 3,
    status: "processing",
    email: "monserrat44@gmail.com",
    amount: 837.0,
  },
  { id: 4, status: "failed", email: "carmella@hotmail.com", amount: 721.0 },
  { id: 5, status: "success", email: "jane@acme.com", amount: 152.0 },
];

export function DisplayGroup() {
  const [progress, setProgress] = useState(13);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    const t = setInterval(() => setProgress((p) => (p >= 100 ? 13 : p + 7)), 900);
    return () => clearInterval(t);
  }, []);
  void progress;

  return (
    <>
      <Section
        id="avatar"
        title="Avatar"
        description="Image element with a fallback for representing the user."
      >
        <Demo name="Basic">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>HT</AvatarFallback>
          </Avatar>
        </Demo>
        <Demo name="Sizes">
          <Avatar size="sm">
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>L</AvatarFallback>
          </Avatar>
        </Demo>
        <Demo name="Badge (status dot)">
          <Avatar>
            <AvatarFallback>HT</AvatarFallback>
            <AvatarBadge className="bg-emerald-500" />
          </Avatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
            <AvatarBadge className="bg-amber-500" />
          </Avatar>
          <Avatar>
            <AvatarFallback>OM</AvatarFallback>
            <AvatarBadge className="bg-neutral-400" />
          </Avatar>
        </Demo>
        <Demo name="Badge with icon">
          <Avatar>
            <AvatarFallback>HT</AvatarFallback>
            <AvatarBadge className="bg-emerald-500 text-white">
              <CheckCircle2Icon className="size-3" />
            </AvatarBadge>
          </Avatar>
        </Demo>
        <Demo name="Avatar Group">
          <AvatarGroup>
            {["AB", "CD", "EF", "GH"].map((i) => (
              <Avatar key={i}>
                <AvatarFallback>{i}</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
        </Demo>
        <Demo name="Avatar Group Count">
          <AvatarGroup>
            {["AB", "CD", "EF"].map((i) => (
              <Avatar key={i}>
                <AvatarFallback>{i}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+12</AvatarGroupCount>
          </AvatarGroup>
        </Demo>
        <Demo name="Avatar Group with icon">
          <AvatarGroup>
            {["AB", "CD"].map((i) => (
              <Avatar key={i}>
                <AvatarFallback>{i}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>
              <PlusIcon className="size-3.5" />
            </AvatarGroupCount>
          </AvatarGroup>
        </Demo>
        <Demo name="Dropdown trigger">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-9 rounded-full">
                <Avatar>
                  <AvatarFallback>HT</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>
      </Section>

      <Section
        id="badge"
        title="Badge"
        description="Displays a badge or a component that looks like a badge."
      >
        <Demo name="Default">
          <Badge>Default</Badge>
        </Demo>
        <Demo name="Secondary">
          <Badge variant="secondary">Secondary</Badge>
        </Demo>
        <Demo name="Destructive">
          <Badge variant="destructive">Destructive</Badge>
        </Demo>
        <Demo name="Outline">
          <Badge variant="outline">Outline</Badge>
        </Demo>
        <Demo name="Ghost">
          <Badge variant="ghost">Ghost</Badge>
        </Demo>
        <Demo name="With icon (verified)">
          <Badge variant="outline">
            <CheckCircle2Icon /> Verified
          </Badge>
          <Badge variant="secondary">
            <BookmarkIcon /> Bookmarked
          </Badge>
        </Demo>
        <Demo name="With icon (bookmark / branch)">
          <Badge>
            <GitBranchIcon /> main
          </Badge>
          <Badge variant="outline">
            <BookmarkIcon /> Pinned
          </Badge>
        </Demo>
        <Demo name="With spinner">
          <Badge variant="destructive">
            <Loader2Icon className="animate-spin" /> Deleting
          </Badge>
          <Badge variant="secondary">
            <Loader2Icon className="animate-spin" /> Generating
          </Badge>
        </Demo>
        <Demo name="Link">
          <Badge asChild>
            <a href="#">Link badge</a>
          </Badge>
        </Demo>
        <Demo name="Custom colors">
          <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">Green</Badge>
          <Badge className="bg-violet-500 text-white hover:bg-violet-600">Violet</Badge>
          <Badge className="bg-amber-500 text-white hover:bg-amber-600">Amber</Badge>
        </Demo>
      </Section>

      <Section
        id="calendar"
        title="Calendar"
        description="A calendar component that allows users to select a date or a range of dates."
      >
        <Demo name="Default" span={2} height="tall">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            captionLayout="dropdown"
            className="rounded-[var(--radius)] border border-border"
          />
        </Demo>
        <Demo name="Basic">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-[var(--radius)] border border-border"
          />
        </Demo>
        <Demo name="Range" span={2} height="tall">
          <Calendar
            mode="range"
            numberOfMonths={2}
            selected={dateRange}
            onSelect={setDateRange}
            className="rounded-[var(--radius)] border border-border"
          />
        </Demo>
        <Demo name="Caption dropdown">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={date}
            onSelect={setDate}
            className="rounded-[var(--radius)] border border-border"
          />
        </Demo>
        <Demo name="Week numbers">
          <Calendar
            mode="single"
            showWeekNumber
            selected={date}
            onSelect={setDate}
            className="rounded-[var(--radius)] border border-border"
          />
        </Demo>
        <Demo name="Booked dates (disabled past)">
          <Calendar
            mode="single"
            disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
            className="rounded-[var(--radius)] border border-border"
          />
        </Demo>
        <Demo name="With presets">
          <div className="w-full space-y-2">
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => setDate(new Date())}>
                Today
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const d = new Date();
                  d.setDate(d.getDate() + 1);
                  setDate(d);
                }}
              >
                Tomorrow
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const d = new Date();
                  d.setDate(d.getDate() + 3);
                  setDate(d);
                }}
              >
                In 3 days
              </Button>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-[var(--radius)] border border-border"
            />
          </div>
        </Demo>
        <Demo name="With time">
          <div className="w-full space-y-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-[var(--radius)] border border-border"
            />
            <Input type="time" defaultValue="14:30" />
          </div>
        </Demo>
        <Demo name="Custom Days">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            modifiers={{
              weekend: (d) => d.getDay() === 0 || d.getDay() === 6,
            }}
            modifiersClassNames={{
              weekend: "text-destructive",
            }}
            className="rounded-[var(--radius)] border border-border"
          />
        </Demo>
        <Demo name="With Timezone">
          <div className="w-full space-y-2">
            <p className="text-xs text-muted-foreground">Timezone: Europe/Prague</p>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              timeZone="Europe/Prague"
              className="rounded-[var(--radius)] border border-border"
            />
          </div>
        </Demo>
        <Demo name="Hijri">
          <div className="w-full space-y-2">
            <p className="text-xs text-muted-foreground">Hijri calendar (right-to-left)</p>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              dir="rtl"
              className="rounded-[var(--radius)] border border-border"
            />
          </div>
        </Demo>
      </Section>

      <Section id="chart" title="Chart" description="Beautiful charts. Built using Recharts.">
        <Demo name="Bar chart">
          <ChartContainer config={CHART_CONFIG} className="h-56 w-full">
            <BarChart data={CHART_DATA}>
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            </BarChart>
          </ChartContainer>
        </Demo>
        <Demo name="With grid">
          <ChartContainer config={CHART_CONFIG} className="h-56 w-full">
            <BarChart data={CHART_DATA}>
              <CartesianGrid vertical={false} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            </BarChart>
          </ChartContainer>
        </Demo>
        <Demo name="With axis">
          <ChartContainer config={CHART_CONFIG} className="h-56 w-full">
            <BarChart data={CHART_DATA}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            </BarChart>
          </ChartContainer>
        </Demo>
        <Demo name="With tooltip">
          <ChartContainer config={CHART_CONFIG} className="h-56 w-full">
            <BarChart data={CHART_DATA}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </Demo>
        <Demo name="With legend" span={2}>
          <ChartContainer config={CHART_CONFIG} className="h-56 w-full">
            <BarChart data={CHART_DATA}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </Demo>
        <Demo name="Tooltip Demo">
          <ChartContainer config={CHART_CONFIG} className="h-56 w-full">
            <BarChart data={CHART_DATA}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            </BarChart>
          </ChartContainer>
        </Demo>
      </Section>

      <Section
        id="data-table"
        title="Data Table"
        description="Powerful table with sort/filter/select. Production setups use TanStack Table."
      >
        <Demo name="Default (sort + filter + select)" span={3} height="tall">
          <DataTableDemo />
        </Demo>
      </Section>

      <Section
        id="skeleton"
        title="Skeleton"
        description="Use to show a placeholder while content is loading."
      >
        <Demo name="Default">
          <Skeleton className="h-9 w-full" />
        </Demo>
        <Demo name="Avatar">
          <div className="flex w-full items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </Demo>
        <Demo name="Card">
          <div className="w-full rounded-[var(--radius)] border border-border p-4">
            <Skeleton className="h-32 w-full rounded-md" />
            <div className="mt-3 space-y-2">
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </Demo>
        <Demo name="Text">
          <div className="w-full space-y-2">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </Demo>
        <Demo name="Form">
          <div className="w-full space-y-3">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-9 w-32" />
          </div>
        </Demo>
        <Demo name="Table" span={2}>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[0, 1, 2, 3, 4].map((i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-3 w-3/4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-3 w-12" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="ml-auto h-3 w-16" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Demo>
      </Section>

      <Section id="table" title="Table" description="A responsive table component.">
        <Demo name="Default" span={2}>
          <Table className="w-full">
            <TableCaption>Recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.method}</TableCell>
                  <TableCell className="text-right">${row.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Demo>
        <Demo name="With footer">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell className="text-right">${row.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell className="text-right">
                  ${INVOICES.reduce((s, r) => s + r.amount, 0).toFixed(2)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Demo>
        <Demo name="Actions" span={2}>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="w-12 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { p: "Phoenix", o: "Hleb", u: "2h ago" },
                { p: "Atlas", o: "Jane", u: "yesterday" },
                { p: "Orion", o: "Sam", u: "Apr 28" },
              ].map((r) => (
                <TableRow key={r.p}>
                  <TableCell className="font-medium">{r.p}</TableCell>
                  <TableCell>{r.o}</TableCell>
                  <TableCell>{r.u}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          ...
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Demo>
      </Section>

      <Section
        id="typography"
        title="Typography"
        description="Styles for headings, paragraphs, lists, etc."
      >
        <Demo name="Demo" span={2}>
          <div className="w-full space-y-3">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
              The Joke Tax Chronicles
            </h1>
            <p className="leading-7 text-muted-foreground">
              Once upon a time, in a far-away land, there lived a king who loved jokes more than
              gold.
            </p>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
              The King&rsquo;s Plan
            </h2>
            <p className="leading-7">
              The king, seeing how much happier his subjects were, realized the error of his ways
              and repealed the joke tax.
            </p>
            <blockquote className="border-l-2 pl-6 italic">
              &ldquo;After all, the only true wisdom is in knowing you know nothing.&rdquo;
            </blockquote>
          </div>
        </Demo>
        <Demo name="H1">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
            Taxing Laughter: The Joke Tax Chronicles
          </h1>
        </Demo>
        <Demo name="H2">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            The People of the Kingdom
          </h2>
        </Demo>
        <Demo name="H3">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">The Joke Tax</h3>
        </Demo>
        <Demo name="H4">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            People stopped telling jokes
          </h4>
        </Demo>
        <Demo name="P">
          <p className="leading-7">
            The king, seeing how much happier his subjects were, realized the error of his ways and
            repealed the joke tax.
          </p>
        </Demo>
        <Demo name="Blockquote">
          <blockquote className="w-full border-l-2 pl-6 italic">
            &ldquo;After all, the only true wisdom is in knowing you know nothing.&rdquo;
          </blockquote>
        </Demo>
        <Demo name="List">
          <ul className="ml-6 list-disc text-sm [&>li]:mt-1">
            <li>Server actions over HTTP routes</li>
            <li>Validate at boundaries with Zod</li>
            <li>RLS on every tenant table</li>
            <li>Conventional commits</li>
          </ul>
        </Demo>
        <Demo name="Table" span={2}>
          <div className="my-6 w-full overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr className="m-0 border-t p-0 even:bg-muted">
                  <th className="border px-4 py-2 text-left font-bold">King&rsquo;s Treasury</th>
                  <th className="border px-4 py-2 text-left font-bold">People&rsquo;s happiness</th>
                </tr>
              </thead>
              <tbody>
                <tr className="m-0 border-t p-0 even:bg-muted">
                  <td className="border px-4 py-2 text-left">Empty</td>
                  <td className="border px-4 py-2 text-left">Overflowing</td>
                </tr>
                <tr className="m-0 border-t p-0 even:bg-muted">
                  <td className="border px-4 py-2 text-left">Modest</td>
                  <td className="border px-4 py-2 text-left">Satisfied</td>
                </tr>
                <tr className="m-0 border-t p-0 even:bg-muted">
                  <td className="border px-4 py-2 text-left">Full</td>
                  <td className="border px-4 py-2 text-left">Ecstatic</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Demo>
        <Demo name="Inline code">
          <p className="text-sm">
            Inline{" "}
            <code className="relative rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              cn(...)
            </code>{" "}
            helper combines class names.
          </p>
        </Demo>
        <Demo name="Lead">
          <p className="text-xl text-muted-foreground">
            Lead. A short summary that introduces the page or section.
          </p>
        </Demo>
        <Demo name="Large">
          <p className="text-lg font-semibold">Large semibold</p>
        </Demo>
        <Demo name="Small">
          <p className="text-sm font-medium leading-none">Small medium</p>
        </Demo>
        <Demo name="Muted">
          <p className="text-sm text-muted-foreground">Muted helper text</p>
        </Demo>
      </Section>
    </>
  );
}

function DataTableDemo() {
  type Row = (typeof PAYMENTS)[number];
  type SortKey = keyof Pick<Row, "email" | "amount" | "status">;
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("amount");
  const [dir, setDir] = useState<"asc" | "desc">("desc");
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const rows = useMemo(() => {
    const filtered = PAYMENTS.filter((r) => r.email.toLowerCase().includes(filter.toLowerCase()));
    return filtered.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") {
        return dir === "asc" ? av - bv : bv - av;
      }
      return dir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }, [filter, sortKey, dir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setDir("asc");
    }
  }

  const sortIcon = (k: SortKey) => {
    if (sortKey !== k) return <ArrowUpDownIcon className="size-3" />;
    return dir === "asc" ? (
      <ArrowUpIcon className="size-3" />
    ) : (
      <ArrowDownIcon className="size-3" />
    );
  };

  return (
    <div className="w-full space-y-3">
      <Input
        placeholder="Filter emails..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-sm"
      />
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-10" />
            <TableHead>
              <button
                type="button"
                className="inline-flex items-center gap-1"
                onClick={() => toggleSort("status")}
              >
                Status {sortIcon("status")}
              </button>
            </TableHead>
            <TableHead>
              <button
                type="button"
                className="inline-flex items-center gap-1"
                onClick={() => toggleSort("email")}
              >
                Email {sortIcon("email")}
              </button>
            </TableHead>
            <TableHead className="text-right">
              <button
                type="button"
                className="inline-flex items-center gap-1"
                onClick={() => toggleSort("amount")}
              >
                Amount {sortIcon("amount")}
              </button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} data-state={selected.has(row.id) ? "selected" : undefined}>
              <TableCell>
                <input
                  type="checkbox"
                  checked={selected.has(row.id)}
                  onChange={(e) =>
                    setSelected((s) => {
                      const next = new Set(s);
                      if (e.target.checked) next.add(row.id);
                      else next.delete(row.id);
                      return next;
                    })
                  }
                />
              </TableCell>
              <TableCell className="capitalize">{row.status}</TableCell>
              <TableCell className="font-medium">{row.email}</TableCell>
              <TableCell className="text-right">${row.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="text-xs text-muted-foreground">
        {selected.size} of {rows.length} row(s) selected.
      </p>
    </div>
  );
}
