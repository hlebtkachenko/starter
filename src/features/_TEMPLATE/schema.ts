// Public zod schemas for the <slice> feature. Imported by:
//   - feature/server/* (validation at boundary)
//   - feature/ui/*    (form resolver via @hookform/resolvers/zod)
//   - tests/*         (fixture typing)

import { z } from "zod";

export const ExampleInput = z.object({
  org_slug: z.string().min(1).max(64),
  name: z.string().min(1).max(120),
});
export type ExampleInput = z.infer<typeof ExampleInput>;

export const ExampleOutput = z.object({
  id: z.string().uuid(),
  org_slug: z.string(),
  name: z.string(),
  created_at: z.string().datetime(),
});
export type ExampleOutput = z.infer<typeof ExampleOutput>;
