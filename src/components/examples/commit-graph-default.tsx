/**
 * @slug commit-graph
 * @variant default
 * @upstream https://ui.justinlevine.me/docs/components/commit-graph
 * @deviations ["ESLint disable for raw button (popover trigger)."]
 */
"use client";

import { CommitGraph, type Commit } from "@/components/ui/commit-graph";

const COMMITS: Commit[] = [
  {
    hash: "a1b2c3d4e5f6",
    message: "feat: add user dashboard",
    author: { name: "Alice Chen" },
    date: new Date(Date.now() - 3_600_000),
    parents: ["b2c3d4e5f6a7"],
    refs: ["main"],
  },
  {
    hash: "b2c3d4e5f6a7",
    message: "Merge branch 'feat/auth' into main",
    author: { name: "Bob Smith" },
    date: new Date(Date.now() - 7_200_000),
    parents: ["c3d4e5f6a7b8", "f6a7b8c9d0e1"],
  },
  {
    hash: "f6a7b8c9d0e1",
    message: "feat: implement OAuth2 flow",
    author: { name: "Charlie Park" },
    date: new Date(Date.now() - 10_800_000),
    parents: ["d4e5f6a7b8c9"],
    refs: ["feat/auth"],
  },
  {
    hash: "c3d4e5f6a7b8",
    message: "fix: resolve memory leak in websocket handler",
    author: { name: "Alice Chen" },
    date: new Date(Date.now() - 14_400_000),
    parents: ["d4e5f6a7b8c9"],
  },
  {
    hash: "d4e5f6a7b8c9",
    message: "chore: update dependencies",
    author: { name: "Bob Smith" },
    date: new Date(Date.now() - 86_400_000),
    parents: ["e5f6a7b8c9d0"],
    tag: "v1.2.0",
  },
  {
    hash: "e5f6a7b8c9d0",
    message: "docs: add API reference",
    author: { name: "Diana Lee" },
    date: new Date(Date.now() - 172_800_000),
    parents: [],
  },
];

export default function CommitGraphDefault() {
  return (
    <div className="w-full">
      <CommitGraph commits={COMMITS} />
    </div>
  );
}
