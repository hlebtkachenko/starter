/**
 * @slug data-table-filter
 * @variant quick-filters
 * @upstream https://ui.bazza.dev/docs/data-table-filter
 * @deviations ["Adds a preset bar above the filter chips. Save the current filter state as a named quick filter, persist to localStorage, click to re-apply, x to remove."]
 */
"use client";

import { Bookmark, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Calendar as CalendarIcon,
  CircleDollarSign,
  FileText,
  Globe,
  ListChecks,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DataTableFilter,
  createColumnConfigHelper,
  useDataTableFilters,
} from "@/components/data-table-filter";
import type { FiltersState } from "@/components/data-table-filter/core/types";

type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "void";

type Invoice = {
  id: string;
  number: string;
  vendor: string;
  status: InvoiceStatus[];
  issuedOn: Date;
  amount: number;
  taxJurisdiction: "CZ" | "SK" | "DE" | "AT" | "PL";
};

const SEED: Invoice[] = [
  {
    id: "1",
    number: "INV-2026-0001",
    vendor: "Acme Suppliers s.r.o.",
    status: ["paid"],
    issuedOn: new Date("2026-04-12"),
    amount: 12_450,
    taxJurisdiction: "CZ",
  },
  {
    id: "2",
    number: "INV-2026-0002",
    vendor: "Globex GmbH",
    status: ["sent", "overdue"],
    issuedOn: new Date("2026-03-28"),
    amount: 47_890,
    taxJurisdiction: "DE",
  },
  {
    id: "3",
    number: "INV-2026-0003",
    vendor: "Initech a.s.",
    status: ["draft"],
    issuedOn: new Date("2026-05-02"),
    amount: 3_120,
    taxJurisdiction: "CZ",
  },
  {
    id: "4",
    number: "INV-2026-0004",
    vendor: "Soylent SK s.r.o.",
    status: ["paid"],
    issuedOn: new Date("2026-04-30"),
    amount: 88_500,
    taxJurisdiction: "SK",
  },
  {
    id: "5",
    number: "INV-2026-0005",
    vendor: "Umbrella AG",
    status: ["void"],
    issuedOn: new Date("2026-02-14"),
    amount: 0,
    taxJurisdiction: "AT",
  },
  {
    id: "6",
    number: "INV-2026-0006",
    vendor: "Wayne Polska sp. z o.o.",
    status: ["sent"],
    issuedOn: new Date("2026-05-08"),
    amount: 21_000,
    taxJurisdiction: "PL",
  },
  {
    id: "7",
    number: "INV-2026-0007",
    vendor: "Tyrell s.r.o.",
    status: ["overdue"],
    issuedOn: new Date("2026-03-04"),
    amount: 15_750,
    taxJurisdiction: "CZ",
  },
];

const dtf = createColumnConfigHelper<Invoice>();
const columnsConfig = [
  dtf
    .text()
    .id("vendor")
    .accessor((r) => r.vendor)
    .displayName("Vendor")
    .icon(FileText)
    .build(),
  dtf
    .multiOption()
    .id("status")
    .accessor((r) => r.status)
    .displayName("Status")
    .icon(ListChecks)
    .options([
      { value: "draft", label: "Draft" },
      { value: "sent", label: "Sent" },
      { value: "paid", label: "Paid" },
      { value: "overdue", label: "Overdue" },
      { value: "void", label: "Void" },
    ])
    .build(),
  dtf
    .date()
    .id("issuedOn")
    .accessor((r) => r.issuedOn)
    .displayName("Issued on")
    .icon(CalendarIcon)
    .build(),
  dtf
    .number()
    .id("amount")
    .accessor((r) => r.amount)
    .displayName("Amount (CZK)")
    .icon(CircleDollarSign)
    .build(),
  dtf
    .option()
    .id("taxJurisdiction")
    .accessor((r) => r.taxJurisdiction)
    .displayName("Tax jurisdiction")
    .icon(Globe)
    .options([
      { value: "CZ", label: "Czech Republic" },
      { value: "SK", label: "Slovakia" },
      { value: "DE", label: "Germany" },
      { value: "AT", label: "Austria" },
      { value: "PL", label: "Poland" },
    ])
    .build(),
] as const;

type QuickFilter = { id: string; name: string; filters: FiltersState };

const STORAGE_KEY = "showcase.dtf.quick-filters";

const STARTER: QuickFilter[] = [
  {
    id: "overdue-large",
    name: "Overdue & large",
    filters: [
      {
        columnId: "status",
        type: "multiOption",
        operator: "include",
        values: ["overdue"],
      },
      {
        columnId: "amount",
        type: "number",
        operator: "is greater than",
        values: [10_000],
      },
    ],
  },
  {
    id: "cz-paid",
    name: "Paid CZ",
    filters: [
      {
        columnId: "taxJurisdiction",
        type: "option",
        operator: "is",
        values: ["CZ"],
      },
      {
        columnId: "status",
        type: "multiOption",
        operator: "include",
        values: ["paid"],
      },
    ],
  },
];

function loadSaved(): QuickFilter[] {
  if (typeof window === "undefined") return STARTER;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return STARTER;
    const parsed = JSON.parse(raw) as QuickFilter[];
    return Array.isArray(parsed) ? parsed : STARTER;
  } catch {
    return STARTER;
  }
}

export default function DataTableFilterQuickFilters() {
  const [data] = useState<Invoice[]>(SEED);
  const [filters, setFilters] = useState<FiltersState>([]);
  const [presets, setPresets] = useState<QuickFilter[]>(STARTER);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [naming, setNaming] = useState(false);
  const [draftName, setDraftName] = useState("");

  useEffect(() => {
    // Hydrate presets from localStorage on mount. Synchronous setState here
    // is the documented pattern for external-store hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPresets(loadSaved());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
  }, [presets]);

  const { columns, actions, strategy } = useDataTableFilters({
    strategy: "client",
    data,
    columnsConfig,
    filters,
    onFiltersChange: setFilters,
  });

  function applyPreset(p: QuickFilter) {
    setFilters(p.filters);
    setActiveId(p.id);
  }

  function saveCurrent() {
    const name = draftName.trim();
    if (!name || filters.length === 0) {
      setNaming(false);
      setDraftName("");
      return;
    }
    const preset: QuickFilter = {
      id: `${Date.now()}`,
      name,
      filters: filters.map((f) => ({ ...f })),
    };
    setPresets((prev) => [...prev, preset]);
    setActiveId(preset.id);
    setDraftName("");
    setNaming(false);
  }

  function deletePreset(id: string) {
    setPresets((prev) => prev.filter((p) => p.id !== id));
    if (activeId === id) setActiveId(null);
  }

  const filteredData = useMemo(() => {
    if (filters.length === 0) return data;
    return data.filter((row) =>
      filters.every((f) => {
        if (f.columnId === "vendor") {
          const v = row.vendor.toLowerCase();
          return (f.values as string[]).some((q) => v.includes(String(q).toLowerCase()));
        }
        if (f.columnId === "status") {
          const vals = f.values as InvoiceStatus[];
          const matches = row.status.some((s) => vals.includes(s));
          return f.operator === "exclude" || f.operator === "exclude if any of"
            ? !matches
            : matches;
        }
        if (f.columnId === "taxJurisdiction") {
          const vals = f.values as string[];
          return f.operator === "is none of"
            ? !vals.includes(row.taxJurisdiction)
            : vals.includes(row.taxJurisdiction);
        }
        if (f.columnId === "issuedOn") {
          const dates = (f.values as Array<Date | string>).map((d) => new Date(d));
          if (f.operator === "is between" && dates.length === 2)
            return row.issuedOn >= dates[0]! && row.issuedOn <= dates[1]!;
          if (f.operator === "is on or after") return row.issuedOn >= dates[0]!;
          if (f.operator === "is on or before") return row.issuedOn <= dates[0]!;
          return true;
        }
        if (f.columnId === "amount") {
          const vals = (f.values as number[]).map(Number);
          if (f.operator === "is between" && vals.length === 2)
            return row.amount >= vals[0]! && row.amount <= vals[1]!;
          if (f.operator === "is greater than") return row.amount > vals[0]!;
          if (f.operator === "is less than") return row.amount < vals[0]!;
          return row.amount === vals[0];
        }
        return true;
      }),
    );
  }, [data, filters]);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
          <Bookmark className="size-3.5" /> Quick filters
        </span>
        {presets.map((p) => (
          <span
            key={p.id}
            className="inline-flex items-center overflow-hidden rounded-full border bg-background"
          >
            <button
              type="button"
              onClick={() => applyPreset(p)}
              className={`px-3 py-1 text-xs ${activeId === p.id ? "bg-muted font-medium" : "hover:bg-muted"}`}
            >
              {p.name}
            </button>
            <button
              type="button"
              aria-label={`Delete ${p.name}`}
              onClick={() => deletePreset(p.id)}
              className="border-l px-1.5 py-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="size-3" />
            </button>
          </span>
        ))}
        {naming ? (
          <span className="inline-flex items-center gap-1">
            <Input
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveCurrent();
                if (e.key === "Escape") {
                  setNaming(false);
                  setDraftName("");
                }
              }}
              placeholder="Preset name"
              className="h-7 w-40 text-xs"
              autoFocus
            />
            <Button size="xs" onClick={saveCurrent}>
              Save
            </Button>
          </span>
        ) : (
          <Button
            size="xs"
            variant="outline"
            disabled={filters.length === 0}
            onClick={() => setNaming(true)}
          >
            <Plus className="mr-1 size-3" />
            Save current
          </Button>
        )}
      </div>

      <DataTableFilter filters={filters} columns={columns} actions={actions} strategy={strategy} />

      <div className="overflow-hidden rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="text-left">
              <th className="px-3 py-2 font-medium">Vendor</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="px-3 py-2">
                  <div className="font-medium">{row.vendor}</div>
                  <div className="text-xs text-muted-foreground">{row.number}</div>
                </td>
                <td className="px-3 py-2 text-muted-foreground">{row.status.join(", ")}</td>
                <td className="px-3 py-2 text-right font-mono">
                  {row.amount.toLocaleString("en-US")}
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={3} className="px-3 py-6 text-center text-muted-foreground">
                  No matches.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
