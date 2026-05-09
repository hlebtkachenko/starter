/**
 * @slug data-table
 * @variant tablecn-style
 * @upstream https://github.com/sadmann7/tablecn
 * @deviations ["Composite example wiring search + bazza chip filters + multi-sort popover + view-options + bulk-action toolbar + URL state via nuqs + column resize + row selection. Invoice dataset."]
 */
"use client";

import {
  type ColumnDef,
  type ColumnSizingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  type Updater,
  type VisibilityState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Calendar as CalendarIcon,
  CircleDollarSign,
  Download,
  FileText,
  Globe,
  ListChecks,
  Trash2,
  X,
} from "lucide-react";
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DataTableFilter,
  createColumnConfigHelper,
  useDataTableFilters,
} from "@/components/data-table-filter";
import type { FiltersState } from "@/components/data-table-filter/core/types";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableMultiSort } from "@/components/data-table/data-table-multi-sort";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";

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
  {
    id: "8",
    number: "INV-2026-0008",
    vendor: "Wonka Industries",
    status: ["paid"],
    issuedOn: new Date("2026-04-19"),
    amount: 9_800,
    taxJurisdiction: "DE",
  },
  {
    id: "9",
    number: "INV-2026-0009",
    vendor: "LexCorp s.r.o.",
    status: ["sent"],
    issuedOn: new Date("2026-05-01"),
    amount: 33_400,
    taxJurisdiction: "CZ",
  },
  {
    id: "10",
    number: "INV-2026-0010",
    vendor: "Stark Industries",
    status: ["draft"],
    issuedOn: new Date("2026-05-09"),
    amount: 120_000,
    taxJurisdiction: "DE",
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
    .displayName("Amount")
    .icon(CircleDollarSign)
    .build(),
  dtf
    .option()
    .id("taxJurisdiction")
    .accessor((r) => r.taxJurisdiction)
    .displayName("Tax")
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

function applyChipFilters(rows: Invoice[], filters: FiltersState): Invoice[] {
  if (filters.length === 0) return rows;
  return rows.filter((row) =>
    filters.every((f) => {
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
    }),
  );
}

function exportCsv(rows: Invoice[]) {
  const header = ["Number", "Vendor", "Status", "Issued", "Amount", "Tax"];
  const lines = [header.join(",")].concat(
    rows.map((r) =>
      [
        r.number,
        `"${r.vendor.replace(/"/g, '""')}"`,
        r.status.join("|"),
        r.issuedOn.toISOString().slice(0, 10),
        r.amount,
        r.taxJurisdiction,
      ].join(","),
    ),
  );
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `invoices-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function DataTableTablecnStyle() {
  return (
    <NuqsAdapter>
      <DataTableTablecnStyleInner />
    </NuqsAdapter>
  );
}

function DataTableTablecnStyleInner() {
  // URL state via nuqs
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState("p", parseAsInteger.withDefault(0));
  const [sortIds, setSortIds] = useQueryState(
    "sort",
    parseAsArrayOf(parseAsString).withDefault([]),
  );
  const [sortDirs, setSortDirs] = useQueryState(
    "dir",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [data, setData] = React.useState<Invoice[]>(SEED);
  const [filters, setFilters] = React.useState<FiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnSizing, setColumnSizing] = React.useState<ColumnSizingState>({});

  const sorting: SortingState = React.useMemo(
    () => sortIds.map((id, i) => ({ id, desc: sortDirs[i] === "desc" })),
    [sortIds, sortDirs],
  );

  const handleSortingChange = React.useCallback(
    (updater: Updater<SortingState>) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;
      setSortIds(next.map((s) => s.id));
      setSortDirs(next.map((s) => (s.desc ? "desc" : "asc")));
    },
    [sorting, setSortIds, setSortDirs],
  );

  const filteredData = React.useMemo(() => {
    const chipFiltered = applyChipFilters(data, filters);
    if (!search.trim()) return chipFiltered;
    const q = search.toLowerCase();
    return chipFiltered.filter(
      (r) => r.vendor.toLowerCase().includes(q) || r.number.toLowerCase().includes(q),
    );
  }, [data, filters, search]);

  const columns = React.useMemo<ColumnDef<Invoice>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(!!v)}
            aria-label="Select row"
          />
        ),
        size: 32,
        enableSorting: false,
        enableHiding: false,
        enableResizing: false,
      },
      {
        accessorKey: "number",
        meta: { label: "Number" },
        header: ({ column }) => <DataTableColumnHeader column={column} label="Number" />,
        cell: ({ row }) => <span className="font-mono text-xs">{row.original.number}</span>,
        size: 130,
      },
      {
        accessorKey: "vendor",
        meta: { label: "Vendor" },
        header: ({ column }) => <DataTableColumnHeader column={column} label="Vendor" />,
        cell: ({ row }) => <span className="font-medium">{row.original.vendor}</span>,
        size: 240,
      },
      {
        id: "status",
        accessorFn: (row) => row.status.join(","),
        meta: { label: "Status" },
        header: ({ column }) => <DataTableColumnHeader column={column} label="Status" />,
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            {row.original.status.map((s) => (
              <Badge key={s} variant="secondary" className="text-xs">
                {s}
              </Badge>
            ))}
          </div>
        ),
        size: 160,
      },
      {
        accessorKey: "issuedOn",
        meta: { label: "Issued" },
        header: ({ column }) => <DataTableColumnHeader column={column} label="Issued" />,
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.original.issuedOn.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        ),
        sortingFn: (a, b) => a.original.issuedOn.getTime() - b.original.issuedOn.getTime(),
        size: 130,
      },
      {
        accessorKey: "amount",
        meta: { label: "Amount" },
        header: ({ column }) => (
          <DataTableColumnHeader column={column} label="Amount" className="justify-end" />
        ),
        cell: ({ row }) => (
          <div className="text-right font-mono">{row.original.amount.toLocaleString("en-US")}</div>
        ),
        size: 110,
      },
      {
        accessorKey: "taxJurisdiction",
        meta: { label: "Tax" },
        header: ({ column }) => <DataTableColumnHeader column={column} label="Tax" />,
        cell: ({ row }) => (
          <span className="text-muted-foreground">{row.original.taxJurisdiction}</span>
        ),
        size: 80,
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
      columnSizing,
      pagination: { pageIndex: page, pageSize: 5 },
    },
    enableRowSelection: true,
    enableMultiSort: true,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    onSortingChange: handleSortingChange,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnSizingChange: setColumnSizing,
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function" ? updater({ pageIndex: page, pageSize: 5 }) : updater;
      setPage(next.pageIndex);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const {
    columns: filterColumns,
    actions,
    strategy,
  } = useDataTableFilters({
    strategy: "client",
    data,
    columnsConfig,
    filters,
    onFiltersChange: setFilters,
  });

  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  function bulkDelete() {
    const selectedIds = new Set(table.getFilteredSelectedRowModel().rows.map((r) => r.original.id));
    setData((prev) => prev.filter((row) => !selectedIds.has(row.id)));
    setRowSelection({});
  }

  function bulkExport() {
    const rows = table.getFilteredSelectedRowModel().rows.map((r) => r.original);
    exportCsv(rows);
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search vendors or numbers..."
          className="h-8 w-64"
        />
        <DataTableFilter
          filters={filters}
          columns={filterColumns}
          actions={actions}
          strategy={strategy}
        />
        <div className="ml-auto flex items-center gap-2">
          <DataTableMultiSort table={table} />
          <DataTableViewOptions table={table} />
          <Button size="sm" variant="outline" onClick={() => exportCsv(filteredData)}>
            <Download className="mr-1 size-3.5" />
            Export
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className="relative"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanResize() && (
                      <button
                        type="button"
                        aria-label="Resize column"
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none bg-border opacity-0 transition-opacity hover:opacity-100 ${
                          header.column.getIsResizing() ? "bg-primary opacity-100" : ""
                        }`}
                      />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No invoices.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />

      {selectedCount > 0 && (
        <div className="sticky bottom-4 mx-auto flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 shadow-lg">
          <span className="text-xs text-muted-foreground">{selectedCount} selected</span>
          <Button size="xs" variant="outline" onClick={bulkExport}>
            <Download className="mr-1 size-3" />
            Export
          </Button>
          <Button size="xs" variant="destructive" onClick={bulkDelete}>
            <Trash2 className="mr-1 size-3" />
            Delete
          </Button>
          <Button
            size="icon-xs"
            variant="ghost"
            aria-label="Clear selection"
            onClick={() => setRowSelection({})}
          >
            <X className="size-3" />
          </Button>
        </div>
      )}
    </div>
  );
}
