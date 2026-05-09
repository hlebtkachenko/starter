/**
 * @slug data-table
 * @variant tablecn-filters
 * @upstream https://github.com/sadmann7/tablecn
 * @deviations ["Tablecn-style popover filter chips (DataTableToolbar with column meta variants: text, multiSelect, select, dateRange, range) wired to local DataTable + DataTableMultiSort. Bulk actions delivered via the project's ActionBar primitive (not tablecn's inline toolbar). Invoice dataset shared with tablecn-style variant for direct visual comparison."]
 */
"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  CalendarIcon,
  CheckCircle2,
  CircleDollarSign,
  CopyIcon,
  Download,
  FileText,
  Globe,
  ListChecks,
  TrashIcon,
  XIcon,
} from "lucide-react";
import * as React from "react";

import {
  ActionBar,
  ActionBarClose,
  ActionBarGroup,
  ActionBarItem,
  ActionBarSelection,
  ActionBarSeparator,
} from "@/components/ui/action-bar";
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
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableMultiSort } from "@/components/data-table/data-table-multi-sort";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
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

export default function DataTableTablecnFilters() {
  const [data, setData] = React.useState<Invoice[]>(SEED);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo<ColumnDef<Invoice>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
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
        meta: {
          label: "Vendor",
          variant: "text",
          placeholder: "Search vendor...",
          icon: FileText,
        },
        header: ({ column }) => <DataTableColumnHeader column={column} label="Vendor" />,
        cell: ({ row }) => <span className="font-medium">{row.original.vendor}</span>,
        size: 240,
        enableColumnFilter: true,
      },
      {
        id: "status",
        accessorKey: "status",
        meta: {
          label: "Status",
          variant: "multiSelect",
          icon: ListChecks,
          options: [
            { value: "draft", label: "Draft" },
            { value: "sent", label: "Sent" },
            { value: "paid", label: "Paid" },
            { value: "overdue", label: "Overdue" },
            { value: "void", label: "Void" },
          ],
        },
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
        filterFn: (row, _id, value) => {
          if (!Array.isArray(value) || value.length === 0) return true;
          return row.original.status.some((s) => (value as string[]).includes(s));
        },
        size: 180,
        enableColumnFilter: true,
      },
      {
        accessorKey: "taxJurisdiction",
        meta: {
          label: "Tax",
          variant: "select",
          icon: Globe,
          options: [
            { value: "CZ", label: "Czech Republic" },
            { value: "SK", label: "Slovakia" },
            { value: "DE", label: "Germany" },
            { value: "AT", label: "Austria" },
            { value: "PL", label: "Poland" },
          ],
        },
        header: ({ column }) => <DataTableColumnHeader column={column} label="Tax" />,
        cell: ({ row }) => (
          <span className="text-muted-foreground">{row.original.taxJurisdiction}</span>
        ),
        filterFn: (row, _id, value) => {
          if (!Array.isArray(value) || value.length === 0) return true;
          return (value as string[]).includes(row.original.taxJurisdiction);
        },
        size: 100,
        enableColumnFilter: true,
      },
      {
        accessorKey: "issuedOn",
        meta: { label: "Issued", variant: "dateRange", icon: CalendarIcon },
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
        filterFn: (row, _id, value) => {
          if (!Array.isArray(value) || value.length === 0) return true;
          const time = row.original.issuedOn.getTime();
          const [start, end] = value as [number | undefined, number | undefined];
          if (start && time < start) return false;
          if (end && time > end) return false;
          return true;
        },
        size: 140,
        enableColumnFilter: true,
      },
      {
        accessorKey: "amount",
        meta: {
          label: "Amount",
          variant: "range",
          icon: CircleDollarSign,
          range: [0, 150_000] as [number, number],
          unit: "Kč",
        },
        header: ({ column }) => (
          <DataTableColumnHeader column={column} label="Amount" className="justify-end" />
        ),
        cell: ({ row }) => (
          <div className="text-right font-mono">{row.original.amount.toLocaleString("en-US")}</div>
        ),
        filterFn: (row, _id, value) => {
          if (!Array.isArray(value) || value.length !== 2) return true;
          const [min, max] = value as [number, number];
          return row.original.amount >= min && row.original.amount <= max;
        },
        size: 120,
        enableColumnFilter: true,
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
      columnFilters,
      globalFilter,
    },
    enableRowSelection: true,
    enableMultiSort: true,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _id, value) => {
      if (!value) return true;
      const q = String(value).toLowerCase();
      return (
        row.original.vendor.toLowerCase().includes(q) ||
        row.original.number.toLowerCase().includes(q)
      );
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    initialState: { pagination: { pageSize: 5 } },
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedCount = selectedRows.length;

  function bulkDelete() {
    const ids = new Set(selectedRows.map((r) => r.original.id));
    setData((prev) => prev.filter((row) => !ids.has(row.id)));
    setRowSelection({});
  }

  function bulkExport() {
    exportCsv(selectedRows.map((r) => r.original));
    setRowSelection({});
  }

  function bulkMarkPaid() {
    const ids = new Set(selectedRows.map((r) => r.original.id));
    setData((prev) =>
      prev.map((row) => (ids.has(row.id) ? { ...row, status: ["paid"] as InvoiceStatus[] } : row)),
    );
    setRowSelection({});
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <Input
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search vendors or numbers..."
          className="h-8 w-64"
        />
        <div className="ml-auto flex items-center gap-2">
          <DataTableMultiSort table={table} />
          <DataTableViewOptions table={table} />
          <Button
            size="sm"
            variant="outline"
            onClick={() => exportCsv(table.getFilteredRowModel().rows.map((r) => r.original))}
          >
            <Download className="mr-1 size-3.5" />
            Export
          </Button>
        </div>
      </div>

      <DataTableToolbar table={table} className="px-0" />

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id} style={{ width: header.getSize() }}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
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
                  No invoices match the active filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />

      <ActionBar open={selectedCount > 0} onOpenChange={(open) => !open && setRowSelection({})}>
        <ActionBarGroup>
          <ActionBarSelection>
            {selectedCount} selected
            <ActionBarSeparator />
          </ActionBarSelection>
          <ActionBarItem onSelect={bulkExport}>
            <Download />
            Export
          </ActionBarItem>
          <ActionBarItem onSelect={bulkMarkPaid}>
            <CheckCircle2 />
            Mark paid
          </ActionBarItem>
          <ActionBarItem onSelect={bulkExport}>
            <CopyIcon />
            Copy
          </ActionBarItem>
          <ActionBarSeparator />
          <ActionBarItem variant="destructive" onSelect={bulkDelete}>
            <TrashIcon />
            Delete
          </ActionBarItem>
          <ActionBarSeparator />
          <ActionBarClose>
            <XIcon />
          </ActionBarClose>
        </ActionBarGroup>
      </ActionBar>
    </div>
  );
}
