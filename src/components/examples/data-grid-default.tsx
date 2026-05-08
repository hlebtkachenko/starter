/**
 * @slug data-grid
 * @variant default
 * @upstream https://www.diceui.com/docs/components/react-table/data-grid
 * @deviations ["Token classes replace hardcoded palette."]
 */
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import * as React from "react";

import { DataGrid } from "@/components/data-grid/data-grid";
import { useDataGrid } from "@/hooks/use-data-grid";

interface Row {
  id: number;
  name: string;
  role: string;
  department: string;
  status: string;
}

const data: Row[] = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Engineer",
    department: "Platform",
    status: "Active",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Designer",
    department: "Product",
    status: "Active",
  },
  {
    id: 3,
    name: "Carol Lee",
    role: "Manager",
    department: "Engineering",
    status: "On leave",
  },
  {
    id: 4,
    name: "Dan Park",
    role: "Analyst",
    department: "Finance",
    status: "Active",
  },
  {
    id: 5,
    name: "Eva Chen",
    role: "Engineer",
    department: "Platform",
    status: "Active",
  },
];

const columns: ColumnDef<Row, unknown>[] = [
  { accessorKey: "name", header: "Name", size: 180 },
  { accessorKey: "role", header: "Role", size: 140 },
  { accessorKey: "department", header: "Department", size: 140 },
  { accessorKey: "status", header: "Status", size: 120 },
];

export default function DataGridDefault() {
  const [rows, setRows] = React.useState(data);

  const grid = useDataGrid({
    data: rows,
    columns,
    onDataChange: setRows,
    onRowAdd: () => {
      const id = rows.length + 1;
      setRows((prev) => [...prev, { id, name: "", role: "", department: "", status: "Active" }]);
      return { rowIndex: rows.length, columnId: "name" };
    },
  });

  return <DataGrid {...grid} height={320} />;
}
