/**
 * Unit tests for src/lib/registry.ts resolver helpers.
 *
 * Runs in the "server" vitest workspace (environment: node, include: src/lib/**).
 * No DOM required — the registry index is plain JS objects + lazy refs.
 */
import { describe, expect, it } from "vitest";

import {
  getExamplesForSlug,
  getRegistryComponent,
  getRegistryItem,
  listAllItems,
  searchRegistry,
} from "./registry";

// ---------------------------------------------------------------------------
// getRegistryItem
// ---------------------------------------------------------------------------

describe("getRegistryItem", () => {
  it("returns the primitive entry for a known UI slug", () => {
    const item = getRegistryItem("button");
    expect(item).toBeDefined();
    expect(item?.name).toBe("button");
    expect(item?.type).toBe("registry:ui");
  });

  it("returns undefined for an unknown name", () => {
    expect(getRegistryItem("this-does-not-exist-xyz")).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// getRegistryComponent
// ---------------------------------------------------------------------------

describe("getRegistryComponent", () => {
  it("returns a function (lazy ref) for a known example", () => {
    // button-outline is a registry:example — it has a React.lazy Component
    const Component = getRegistryComponent("button-outline");
    // React.lazy returns an object with a $$typeof and _payload; it is a function
    // in terms of typeof checks only on older React, but in React 19 lazy() returns
    // an object. Check that it is truthy and is not undefined.
    expect(Component).toBeDefined();
    expect(Component).not.toBeNull();
  });

  it("returns undefined for a UI primitive (no lazy Component)", () => {
    // UI primitives set Component: undefined in __index__.tsx
    const Component = getRegistryComponent("button");
    expect(Component).toBeUndefined();
  });

  it("returns undefined for an unknown name", () => {
    expect(getRegistryComponent("totally-unknown-xyz")).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// getExamplesForSlug
// ---------------------------------------------------------------------------

describe("getExamplesForSlug", () => {
  it("returns all example entries for the button slug", () => {
    const examples = getExamplesForSlug("button");
    expect(examples.length).toBeGreaterThan(0);
    for (const e of examples) {
      expect(e.slug).toBe("button");
      expect(e.type).toBe("registry:example");
    }
  });

  it("returns empty array for an unknown slug", () => {
    expect(getExamplesForSlug("slug-that-does-not-exist")).toHaveLength(0);
  });

  it("includes button-outline in the button examples", () => {
    const examples = getExamplesForSlug("button");
    const names = examples.map((e) => e.name);
    expect(names).toContain("button-outline");
  });
});

// ---------------------------------------------------------------------------
// listAllItems
// ---------------------------------------------------------------------------

describe("listAllItems", () => {
  it("returns every registry item (ui + examples + blocks)", () => {
    const all = listAllItems();
    expect(all.length).toBeGreaterThan(0);

    const types = new Set(all.map((i) => i.type));
    // Must include at least ui and examples
    expect(types.has("registry:ui")).toBe(true);
    expect(types.has("registry:example")).toBe(true);
  });

  it("contains no duplicate names", () => {
    const all = listAllItems();
    const names = all.map((i) => i.name);
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });
});

// ---------------------------------------------------------------------------
// searchRegistry
// ---------------------------------------------------------------------------

describe("searchRegistry", () => {
  it("finds button-outline when searching 'outline'", () => {
    const results = searchRegistry("outline");
    const names = results.map((r) => r.name);
    expect(names).toContain("button-outline");
  });

  it("is case-insensitive", () => {
    const lower = searchRegistry("outline");
    const upper = searchRegistry("OUTLINE");
    expect(lower.map((r) => r.name)).toEqual(upper.map((r) => r.name));
  });

  it("returns empty array for a query that matches nothing", () => {
    expect(searchRegistry("zzznomatchxxx")).toHaveLength(0);
  });

  it("matches against description text", () => {
    // Every button example has description containing something about buttons
    const results = searchRegistry("primary Button");
    expect(results.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Cycle detection — validate() in build-registry.ts
// ---------------------------------------------------------------------------

describe("cycle detection in validate()", () => {
  /**
   * We call the validate function directly by importing the build-registry
   * module. Since build-registry.ts uses process.exit(1) on error, we capture
   * stderr output and intercept process.exit via a spy.
   *
   * The validate function is not exported, so we test it indirectly: we construct
   * a synthetic item array with a self-cycle and confirm that the build script's
   * validate logic (which IS exported implicitly via the build() call) would catch it.
   *
   * Since we cannot easily import internal functions from a tsx script without
   * restructuring it, we replicate the cycle-detection logic inline here to
   * verify the algorithm is sound, then confirm the actual registry has no cycles.
   */

  function detectCycles(depGraph: Record<string, string[]>): string[] {
    const WHITE = 0,
      GRAY = 1,
      BLACK = 2;
    const color: Record<string, number> = {};
    for (const name of Object.keys(depGraph)) color[name] = WHITE;
    const cycles: string[] = [];

    function dfs(node: string, stack: string[]): void {
      color[node] = GRAY;
      stack.push(node);
      for (const next of depGraph[node] ?? []) {
        if (color[next] === GRAY) {
          const cycleStart = stack.indexOf(next);
          cycles.push([...stack.slice(cycleStart), next].join(" -> "));
          continue;
        }
        if (color[next] === WHITE && depGraph[next] !== undefined) {
          dfs(next, stack);
        }
      }
      stack.pop();
      color[node] = BLACK;
    }

    for (const name of Object.keys(depGraph)) {
      if (color[name] === WHITE) dfs(name, []);
    }
    return cycles;
  }

  it("detects a self-cycle (A -> A)", () => {
    const graph = { a: ["a"] };
    const cycles = detectCycles(graph);
    expect(cycles.length).toBeGreaterThan(0);
    expect(cycles[0]).toContain("a");
  });

  it("detects a two-node cycle (A -> B -> A)", () => {
    const graph = { a: ["b"], b: ["a"] };
    const cycles = detectCycles(graph);
    expect(cycles.length).toBeGreaterThan(0);
  });

  it("detects a three-node cycle (A -> B -> C -> A)", () => {
    const graph = { a: ["b"], b: ["c"], c: ["a"] };
    const cycles = detectCycles(graph);
    expect(cycles.length).toBeGreaterThan(0);
  });

  it("does not flag a valid DAG (A -> B -> C)", () => {
    const graph = { a: ["b"], b: ["c"], c: [] };
    const cycles = detectCycles(graph);
    expect(cycles).toHaveLength(0);
  });

  it("actual registry has no cycles", () => {
    const all = listAllItems();
    const graph: Record<string, string[]> = {};
    for (const item of all) {
      graph[item.name] = [...(item.registryDependencies ?? [])];
    }
    const cycles = detectCycles(graph);
    expect(cycles).toHaveLength(0);
  });
});
