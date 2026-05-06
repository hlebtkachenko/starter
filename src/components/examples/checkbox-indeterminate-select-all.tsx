"use client";

import { useState } from "react";

import { CHECKBOX_ROWS } from "@/components/examples/_fixtures/checkbox";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";

export default function CheckboxIndeterminateSelectAll() {
  const [tableSelect, setTableSelect] = useState<Set<string>>(new Set());
  return (
    <div className="w-full space-y-2 text-sm">
      <Field orientation="horizontal">
        <Checkbox
          checked={
            tableSelect.size === CHECKBOX_ROWS.length
              ? true
              : tableSelect.size === 0
                ? false
                : "indeterminate"
          }
          onCheckedChange={(v) => setTableSelect(v === true ? new Set(CHECKBOX_ROWS) : new Set())}
        />
        <span className="font-medium">Select all</span>
      </Field>
      {CHECKBOX_ROWS.map((label) => (
        <Field key={label} orientation="horizontal">
          <Checkbox
            checked={tableSelect.has(label)}
            onCheckedChange={(v) =>
              setTableSelect((s) => {
                const next = new Set(s);
                if (v === true) next.add(label);
                else next.delete(label);
                return next;
              })
            }
          />
          <FieldLabel className="font-normal">{label}</FieldLabel>
        </Field>
      ))}
    </div>
  );
}
