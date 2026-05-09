/**
 * @slug data-table-filter
 * @variant default
 * @upstream https://ui.bazza.dev/docs/data-table-filter
 * @deviations ["Finance/accounting flavor: invoice ledger with text, multi-select status, date, currency, and tax-jurisdiction columns. Demonstrates all 5 bazza/ui column types in one screen."]
 */
"use client";

import { useMemo, useState } from "react";
import {
  Calendar as CalendarIcon,
  CircleDollarSign,
  FileText,
  Globe,
  ListChecks,
} from "lucide-react";
import {
  DataTableFilter,
  createColumnConfigHelper,
  useDataTableFilters,
} from "@/components/data-table-filter";

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
    .accessor((row) => row.vendor)
    .displayName("Vendor")
    .icon(FileText)
    .build(),
  dtf
    .multiOption()
    .id("status")
    .accessor((row) => row.status)
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
    .accessor((row) => row.issuedOn)
    .displayName("Issued on")
    .icon(CalendarIcon)
    .build(),
  dtf
    .number()
    .id("amount")
    .accessor((row) => row.amount)
    .displayName("Amount (CZK)")
    .icon(CircleDollarSign)
    .build(),
  dtf
    .option()
    .id("taxJurisdiction")
    .accessor((row) => row.taxJurisdiction)
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

export default function DataTableFilterDefault() {
  const [data] = useState<Invoice[]>(SEED);

  const { columns, filters, actions, strategy } = useDataTableFilters({
    strategy: "client",
    data,
    columnsConfig,
  });

  const filteredData = useMemo(() => {
    if (filters.length === 0) return data;
    return data.filter((row) => {
      return filters.every((f) => {
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
          if (f.operator === "is before") return row.issuedOn < dates[0]!;
          if (f.operator === "is after") return row.issuedOn > dates[0]!;
          return row.issuedOn.toDateString() === dates[0]?.toDateString();
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
    });
  }, [data, filters]);

  return (
    <div className="flex w-full flex-col gap-4">
      <DataTableFilter filters={filters} columns={columns} actions={actions} strategy={strategy} />

      <div className="overflow-hidden rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="text-left">
              <th className="px-3 py-2 font-medium">Vendor</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium">Issued</th>
              <th className="px-3 py-2 text-right font-medium">Amount</th>
              <th className="px-3 py-2 font-medium">Tax</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="px-3 py-2">
                  <div className="font-medium">{row.vendor}</div>
                  <div className="text-xs text-muted-foreground">{row.number}</div>
                </td>
                <td className="px-3 py-2">
                  <div className="flex flex-wrap gap-1">
                    {row.status.map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-3 py-2 text-muted-foreground">
                  {row.issuedOn.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-3 py-2 text-right font-mono">
                  {row.amount.toLocaleString("en-US")}
                </td>
                <td className="px-3 py-2 text-muted-foreground">{row.taxJurisdiction}</td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-muted-foreground">
                  No invoices match.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
