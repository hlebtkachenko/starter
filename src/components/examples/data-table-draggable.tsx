/**
 * @slug data-table
 * @variant draggable
 * @upstream https://shadcnstudio.com/docs/components/data-table
 * @deviations ["Uses @dnd-kit for drag-and-drop column reordering."]
 */
"use client";

import type { CSSProperties } from "react";
import { useState, useId } from "react";

import { ChevronDownIcon, ChevronUpIcon, GripVerticalIcon } from "lucide-react";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Cell, ColumnDef, Header, SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Employee = {
  employeeId: number;
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  salary: number;
};

const data: Employee[] = [
  {
    employeeId: 1,
    firstName: "John",
    lastName: "Doe",
    jobTitle: "Software Engineer",
    department: "Engineering",
    salary: 80000,
  },
  {
    employeeId: 2,
    firstName: "Jane",
    lastName: "Smith",
    jobTitle: "Product Manager",
    department: "Product",
    salary: 95000,
  },
  {
    employeeId: 3,
    firstName: "Alice",
    lastName: "Johnson",
    jobTitle: "UX Designer",
    department: "Design",
    salary: 70000,
  },
  {
    employeeId: 4,
    firstName: "Bob",
    lastName: "Brown",
    jobTitle: "Data Analyst",
    department: "Analytics",
    salary: 75000,
  },
];

const columns: ColumnDef<Employee>[] = [
  {
    id: "firstName",
    header: "First Name",
    accessorKey: "firstName",
    cell: ({ row }) => <div className="font-medium">{row.getValue("firstName")}</div>,
    sortUndefined: "last",
    sortDescFirst: false,
  },
  {
    id: "lastName",
    header: "Last Name",
    accessorKey: "lastName",
    cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
  },
  {
    id: "jobTitle",
    header: "Job Title",
    accessorKey: "jobTitle",
    cell: ({ row }) => <div>{row.getValue("jobTitle")}</div>,
  },
  {
    id: "department",
    header: "Department",
    accessorKey: "department",
    cell: ({ row }) => <div>{row.getValue("department")}</div>,
  },
  {
    id: "salary",
    header: "Salary",
    accessorKey: "salary",
    cell: ({ row }) => {
      const salary = parseFloat(row.getValue("salary"));
      return (
        <div>
          {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(salary)}
        </div>
      );
    },
  },
];

function DraggableTableHeader({ header }: { header: Header<Employee, unknown> }) {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id: header.column.id,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
    transition,
    whiteSpace: "nowrap",
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <TableHead
      ref={setNodeRef}
      className="before:bg-border relative h-10 border-t before:absolute before:inset-y-0 before:left-0 before:w-px first:before:bg-transparent"
      style={style}
    >
      <div className="flex items-center justify-start gap-0.5">
        <Button
          size="icon"
          variant="ghost"
          className="-ml-2 size-7"
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
        >
          <GripVerticalIcon className="opacity-60" aria-hidden="true" />
        </Button>
        <span className="grow truncate">
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </span>
        <Button
          size="icon"
          variant="ghost"
          className="group -mr-1 size-7"
          onClick={header.column.getToggleSortingHandler()}
          onKeyDown={(e) => {
            if (header.column.getCanSort() && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              header.column.getToggleSortingHandler()?.(e);
            }
          }}
          aria-label="Toggle sorting"
        >
          {{
            asc: <ChevronUpIcon className="shrink-0 opacity-60" size={16} aria-hidden="true" />,
            desc: <ChevronDownIcon className="shrink-0 opacity-60" size={16} aria-hidden="true" />,
          }[header.column.getIsSorted() as string] ?? (
            <ChevronUpIcon
              className="shrink-0 opacity-0 group-hover:opacity-60"
              size={16}
              aria-hidden="true"
            />
          )}
        </Button>
      </div>
    </TableHead>
  );
}

function DragAlongCell({ cell }: { cell: Cell<Employee, unknown> }) {
  const { isDragging, setNodeRef, transform, transition } = useSortable({ id: cell.column.id });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
    transition,
    width: cell.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <TableCell ref={setNodeRef} className="truncate" style={style}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
}

export default function DataTableDraggable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((column) => column.id as string),
  );

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting, columnOrder },
    onColumnOrderChange: setColumnOrder,
    enableSortingRemoval: false,
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <DndContext
          id={useId()}
          collisionDetection={closestCenter}
          modifiers={[restrictToHorizontalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-muted/50 [&>th]:border-t-0">
                  <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
                    {headerGroup.headers.map((header) => (
                      <DraggableTableHeader key={header.id} header={header} />
                    ))}
                  </SortableContext>
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <SortableContext
                        key={cell.id}
                        items={columnOrder}
                        strategy={horizontalListSortingStrategy}
                      >
                        <DragAlongCell key={cell.id} cell={cell} />
                      </SortableContext>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>
    </div>
  );
}
