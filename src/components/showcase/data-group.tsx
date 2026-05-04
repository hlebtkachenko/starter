"use client";

import { MoreHorizontalIcon, PauseIcon, PlayIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  { id: "INV005", status: "Paid", method: "Credit Card", amount: 50 },
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

const STATUS_COLOR: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  Paid: "secondary",
  Pending: "outline",
  Unpaid: "destructive",
};

export function DataGroup() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- embla mount sync
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Section id="data" title="Data" description="Table, carousel, charts (bar, line, area).">
      {/* Table */}
      <Demo name="Table — basic" span={2}>
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
                <TableCell>
                  <Badge variant={STATUS_COLOR[row.status] ?? "default"}>{row.status}</Badge>
                </TableCell>
                <TableCell>{row.method}</TableCell>
                <TableCell className="text-right">${row.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Demo>

      <Demo name="Table — with footer" span={2}>
        <Table className="w-full">
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
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                ${INVOICES.reduce((s, r) => s + r.amount, 0).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Demo>

      <Demo name="Table — actions row" span={2}>
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
                      <Button variant="ghost" size="icon" aria-label="row actions">
                        <MoreHorizontalIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Demo>

      {/* Carousel */}
      <Demo name="Carousel — basic" span={2} height="tall">
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

      <Demo name="Carousel — sizes (basis)">
        <div className="w-full py-4">
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent className="-ml-2">
              {Array.from({ length: 8 }, (_, i) => (
                <CarouselItem key={i} className="basis-1/3 pl-2">
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

      <Demo name="Carousel — spacing">
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

      <Demo name="Carousel — vertical">
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

      <Demo name="Carousel — API (slide N of M)">
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
      </Demo>

      <Demo name="Carousel — controlled (manual autoplay)">
        <ManualAutoplay />
      </Demo>

      {/* Chart */}
      <Demo name="Chart — bar (interactive)">
        <ChartContainer config={CHART_CONFIG} className="h-56 w-full">
          <BarChart data={CHART_DATA}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </Demo>

      <Demo name="Chart — bar with data">
        <ChartContainer config={CHART_CONFIG} className="h-56 w-full">
          <BarChart data={CHART_DATA} layout="vertical">
            <CartesianGrid horizontal={false} />
            <XAxis type="number" tickLine={false} axisLine={false} />
            <YAxis dataKey="month" type="category" tickLine={false} axisLine={false} width={40} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </Demo>

      <Demo name="Chart — with grid only">
        <ChartContainer config={CHART_CONFIG} className="h-56 w-full">
          <BarChart data={CHART_DATA}>
            <CartesianGrid />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </Demo>

      <Demo name="Chart — with axis labels">
        <ChartContainer config={CHART_CONFIG} className="h-56 w-full">
          <BarChart data={CHART_DATA}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </Demo>

      <Demo name="Chart — with tooltip (label)">
        <ChartContainer config={CHART_CONFIG} className="h-56 w-full">
          <BarChart data={CHART_DATA}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </Demo>

      <Demo name="Chart — with tooltip (dot/name)">
        <ChartContainer config={CHART_CONFIG} className="h-56 w-full">
          <BarChart data={CHART_DATA}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </Demo>

      <Demo name="Chart — with legend" span={2}>
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

      <Demo name="Chart — line">
        <ChartContainer config={CHART_CONFIG} className="h-56 w-full">
          <LineChart data={CHART_DATA}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="desktop"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mobile"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </Demo>

      <Demo name="Chart — area (stacked)">
        <ChartContainer config={CHART_CONFIG} className="h-56 w-full">
          <AreaChart data={CHART_DATA}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="mobile"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </Demo>
    </Section>
  );
}

function ManualAutoplay() {
  const [api, setApi] = useState<CarouselApi>();
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!api || !playing) return;
    const id = setInterval(() => api.scrollNext(), 1500);
    return () => clearInterval(id);
  }, [api, playing]);
  return (
    <div className="w-full py-2">
      <Carousel setApi={setApi} className="w-full">
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
      <div className="mt-2 flex justify-center">
        <Button size="sm" variant="outline" onClick={() => setPlaying((p) => !p)}>
          {playing ? <PauseIcon /> : <PlayIcon />}
          {playing ? "Pause" : "Autoplay"}
        </Button>
      </div>
    </div>
  );
}
