/**
 * @slug data-table-filter
 * @variant default
 * @upstream https://ui.bazza.dev/docs/data-table-filter
 * @deviations ["Uses project Button/Popover/Command/Input primitives via shadcn registry installation. Linear-style filter chip layout."]
 */
"use client";

import { useMemo, useState } from "react";
import { Briefcase, CircleDollarSign, User } from "lucide-react";
import {
  DataTableFilter,
  createColumnConfigHelper,
  useDataTableFilters,
} from "@/components/data-table-filter";

type Employee = {
  id: string;
  name: string;
  department: "Engineering" | "Design" | "Marketing" | "Sales";
  salary: number;
};

const SEED: Employee[] = [
  {
    id: "1",
    name: "Hleb Tkachenko",
    department: "Engineering",
    salary: 95_000,
  },
  { id: "2", name: "Anna Novak", department: "Design", salary: 72_000 },
  {
    id: "3",
    name: "Marek Svoboda",
    department: "Engineering",
    salary: 110_000,
  },
  { id: "4", name: "Petra Dvorak", department: "Marketing", salary: 68_000 },
  { id: "5", name: "Lucas Costa", department: "Sales", salary: 84_000 },
  { id: "6", name: "Sofia Rossi", department: "Design", salary: 79_000 },
];

const dtf = createColumnConfigHelper<Employee>();

const columnsConfig = [
  dtf
    .text()
    .id("name")
    .accessor((row) => row.name)
    .displayName("Name")
    .icon(User)
    .build(),
  dtf
    .option()
    .id("department")
    .accessor((row) => row.department)
    .displayName("Department")
    .icon(Briefcase)
    .options([
      { value: "Engineering", label: "Engineering" },
      { value: "Design", label: "Design" },
      { value: "Marketing", label: "Marketing" },
      { value: "Sales", label: "Sales" },
    ])
    .build(),
  dtf
    .number()
    .id("salary")
    .accessor((row) => row.salary)
    .displayName("Salary")
    .icon(CircleDollarSign)
    .build(),
] as const;

export default function DataTableFilterDefault() {
  const [data] = useState<Employee[]>(SEED);

  const { columns, filters, actions, strategy } = useDataTableFilters({
    strategy: "client",
    data,
    columnsConfig,
  });

  const filteredData = useMemo(() => {
    if (filters.length === 0) return data;
    return data.filter((row) => {
      return filters.every((f) => {
        if (f.columnId === "name") {
          const v = row.name.toLowerCase();
          return (f.values as string[]).some((q) => v.includes(String(q).toLowerCase()));
        }
        if (f.columnId === "department") {
          const vals = f.values as string[];
          return f.operator === "is none of"
            ? !vals.includes(row.department)
            : vals.includes(row.department);
        }
        if (f.columnId === "salary") {
          const vals = (f.values as number[]).map(Number);
          if (f.operator === "is between" && vals.length === 2)
            return row.salary >= vals[0]! && row.salary <= vals[1]!;
          if (f.operator === "is greater than") return row.salary > vals[0]!;
          if (f.operator === "is less than") return row.salary < vals[0]!;
          return row.salary === vals[0];
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
              <th className="px-3 py-2 font-medium">Name</th>
              <th className="px-3 py-2 font-medium">Department</th>
              <th className="px-3 py-2 text-right font-medium">Salary</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="px-3 py-2">{row.name}</td>
                <td className="px-3 py-2 text-muted-foreground">{row.department}</td>
                <td className="px-3 py-2 text-right font-mono">
                  ${row.salary.toLocaleString("en-US")}
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
