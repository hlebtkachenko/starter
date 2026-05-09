"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Table } from "@tanstack/react-table";
import { ArrowUpDown, GripVertical, Trash2 } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DataTableMultiSortProps<TData> {
  table: Table<TData>;
  className?: string;
}

export function DataTableMultiSort<TData>({ table, className }: DataTableMultiSortProps<TData>) {
  const sorting = table.getState().sorting;
  const setSorting = table.setSorting;

  const sortableColumns = React.useMemo(
    () => table.getAllColumns().filter((c) => c.getCanSort()),
    [table],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function addSort() {
    const used = new Set(sorting.map((s) => s.id));
    const next = sortableColumns.find((c) => !used.has(c.id));
    if (!next) return;
    setSorting([...sorting, { id: next.id, desc: false }]);
  }

  function reset() {
    setSorting([]);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sorting.findIndex((s) => s.id === active.id);
    const newIndex = sorting.findIndex((s) => s.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    setSorting(arrayMove(sorting, oldIndex, newIndex));
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className={cn("h-8", className)}>
          <ArrowUpDown className="mr-1 size-3.5" />
          Sort
          {sorting.length > 0 && (
            <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-xs">
              {sorting.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[380px] p-3">
        <div className="mb-2 text-sm font-semibold">Sort by</div>
        {sorting.length === 0 ? (
          <div className="rounded-md border border-dashed py-4 text-center text-xs text-muted-foreground">
            No sorts applied. Add one to begin.
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sorting.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-1.5">
                {sorting.map((rule) => {
                  const usedElsewhere = new Set(
                    sorting.filter((s) => s.id !== rule.id).map((s) => s.id),
                  );
                  const available = sortableColumns.filter((c) => !usedElsewhere.has(c.id));
                  return (
                    <SortRuleRow
                      key={rule.id}
                      ruleId={rule.id}
                      desc={rule.desc}
                      availableColumns={available}
                      onColumnChange={(nextId) => {
                        setSorting(
                          sorting.map((s) => (s.id === rule.id ? { ...s, id: nextId } : s)),
                        );
                      }}
                      onDirectionChange={(nextDesc) => {
                        setSorting(
                          sorting.map((s) => (s.id === rule.id ? { ...s, desc: nextDesc } : s)),
                        );
                      }}
                      onRemove={() => {
                        setSorting(sorting.filter((s) => s.id !== rule.id));
                      }}
                      labelFor={(id) => columnLabel(table, id)}
                    />
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        )}

        <div className="mt-3 flex items-center gap-2">
          <Button size="sm" onClick={addSort} disabled={sorting.length >= sortableColumns.length}>
            Add sort
          </Button>
          <Button size="sm" variant="outline" onClick={reset} disabled={sorting.length === 0}>
            Reset sorting
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function columnLabel<TData>(table: Table<TData>, id: string): string {
  const col = table.getColumn(id);
  if (!col) return id;
  const header = col.columnDef.header;
  if (typeof header === "string") return header;
  if (col.columnDef.meta && typeof col.columnDef.meta === "object") {
    const label = (col.columnDef.meta as { label?: string }).label;
    if (label) return label;
  }
  return id;
}

interface SortRuleRowProps {
  ruleId: string;
  desc: boolean;
  availableColumns: { id: string }[];
  onColumnChange: (nextId: string) => void;
  onDirectionChange: (desc: boolean) => void;
  onRemove: () => void;
  labelFor: (id: string) => string;
}

function SortRuleRow({
  ruleId,
  desc,
  availableColumns,
  onColumnChange,
  onDirectionChange,
  onRemove,
  labelFor,
}: SortRuleRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: ruleId,
  });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-1.5">
      <Select value={ruleId} onValueChange={onColumnChange}>
        <SelectTrigger className="h-8 flex-1">
          <SelectValue placeholder="Column" />
        </SelectTrigger>
        <SelectContent>
          {availableColumns.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {labelFor(c.id)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={desc ? "desc" : "asc"} onValueChange={(v) => onDirectionChange(v === "desc")}>
        <SelectTrigger className="h-8 w-[88px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Asc</SelectItem>
          <SelectItem value="desc">Desc</SelectItem>
        </SelectContent>
      </Select>
      <Button
        size="icon-sm"
        variant="ghost"
        aria-label="Remove sort"
        onClick={onRemove}
        className="text-muted-foreground hover:text-foreground"
      >
        <Trash2 className="size-4" />
      </Button>
      <button
        type="button"
        aria-label="Drag to reorder"
        {...attributes}
        {...listeners}
        className="flex h-8 w-6 cursor-grab items-center justify-center text-muted-foreground hover:text-foreground active:cursor-grabbing"
      >
        <GripVertical className="size-4" />
      </button>
    </div>
  );
}
