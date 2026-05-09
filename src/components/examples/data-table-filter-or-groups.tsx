/**
 * @slug data-table-filter
 * @variant or-groups
 * @upstream https://ui.bazza.dev/docs/data-table-filter
 * @deviations ["Composes multiple bazza filter bars into OR groups. Each bar is AND internally; rows are joined by ANY (OR). Add/remove rows; rows operate independently."]
 */
"use client";

import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Calendar as CalendarIcon,
  CircleDollarSign,
  FileText,
  Globe,
  ListChecks,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

function matchInvoice(row: Invoice, filters: FiltersState): boolean {
  return filters.every((f) => {
    if (f.columnId === "vendor") {
      const v = row.vendor.toLowerCase();
      return (f.values as string[]).some((q) => v.includes(String(q).toLowerCase()));
    }
    if (f.columnId === "status") {
      const vals = f.values as InvoiceStatus[];
      const matches = row.status.some((s) => vals.includes(s));
      return f.operator === "exclude" || f.operator === "exclude if any of" ? !matches : matches;
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
  });
}

function FilterGroupRow({
  data,
  filters,
  onChange,
  onRemove,
  removable,
}: {
  data: Invoice[];
  filters: FiltersState;
  onChange: React.Dispatch<React.SetStateAction<FiltersState>>;
  onRemove: () => void;
  removable: boolean;
}) {
  const { columns, actions, strategy } = useDataTableFilters({
    strategy: "client",
    data,
    columnsConfig,
    filters,
    onFiltersChange: onChange as React.Dispatch<React.SetStateAction<FiltersState>>,
  });
  return (
    <div className="flex items-start gap-2 rounded-lg border bg-muted/30 p-2">
      <div className="flex-1">
        <DataTableFilter
          filters={filters}
          columns={columns}
          actions={actions}
          strategy={strategy}
        />
      </div>
      {removable && (
        <Button
          size="icon-sm"
          variant="ghost"
          aria-label="Remove group"
          onClick={onRemove}
          className="text-muted-foreground hover:text-foreground"
        >
          <Trash2 className="size-4" />
        </Button>
      )}
    </div>
  );
}

type Group = { id: string; filters: FiltersState };

let nextGroupId = 1;
const newGroup = (filters: FiltersState = []): Group => ({
  id: `g${nextGroupId++}`,
  filters,
});

export default function DataTableFilterOrGroups() {
  const [data] = useState<Invoice[]>(SEED);
  const [groups, setGroups] = useState<Group[]>(() => [
    newGroup([
      {
        columnId: "status",
        type: "multiOption",
        operator: "include",
        values: ["overdue"],
      },
    ]),
    newGroup([
      {
        columnId: "amount",
        type: "number",
        operator: "is greater than",
        values: [50_000],
      },
    ]),
  ]);

  const filteredData = useMemo(() => {
    const active = groups.filter((g) => g.filters.length > 0);
    if (active.length === 0) return data;
    return data.filter((row) => active.some((g) => matchInvoice(row, g.filters)));
  }, [data, groups]);

  function updateGroup(id: string, update: React.SetStateAction<FiltersState>) {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        const next = typeof update === "function" ? update(g.filters) : update;
        return { ...g, filters: Array.isArray(next) ? next : [] };
      }),
    );
  }
  function removeGroup(id: string) {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  }
  function addGroup() {
    setGroups((prev) => [...prev, newGroup()]);
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="text-xs text-muted-foreground">
        Each row is <span className="font-medium text-foreground">AND</span> inside; rows are joined
        by <span className="font-medium text-foreground">OR</span>. A row matches one criteria; the
        table shows invoices matching at least one row.
      </div>

      <div className="flex flex-col gap-2">
        {groups.map((g, i) => (
          <div key={g.id} className="flex items-stretch gap-2">
            {i > 0 && (
              <div className="flex flex-col items-center justify-center px-1">
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  OR
                </span>
              </div>
            )}
            <div className="flex-1">
              <FilterGroupRow
                data={data}
                filters={g.filters}
                onChange={(next) => updateGroup(g.id, next)}
                onRemove={() => removeGroup(g.id)}
                removable={groups.length > 1}
              />
            </div>
          </div>
        ))}
      </div>

      <Button size="sm" variant="outline" onClick={addGroup} className="self-start">
        <Plus className="mr-1 size-3.5" />
        Add OR group
      </Button>

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
