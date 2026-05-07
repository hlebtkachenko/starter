/**
 * MCP registry server — stdio JSON-RPC bridge for the component registry.
 *
 * Exposes four tools that any Claude Code chat can call directly:
 *   - searchRegistry(query)
 *   - getRegistryComponent(name)
 *   - listExamples(slug?)
 *   - listBlocks()
 *
 * Run via:
 *   pnpm mcp:registry-server
 *
 * TODO: Install @modelcontextprotocol/sdk to enable the full MCP server.
 *       Run: pnpm add @modelcontextprotocol/sdk
 *       Then replace the stub below with the real server implementation
 *       shown in the commented-out section at the bottom of this file.
 */

// ---------------------------------------------------------------------------
// Core registry adapters — these typecheck and run regardless of SDK presence.
// ---------------------------------------------------------------------------

import {
  searchRegistry,
  getRegistryItem,
  getExamplesForSlug,
  listExampleNames,
  listBlockNames,
  listAllItems,
} from "@/lib/registry";
import type { RegistryItem } from "@/lib/registry-schema";

/** Shape returned by the searchRegistry tool. */
export type SearchResult = {
  name: string;
  type: RegistryItem["type"];
  title?: string | undefined;
  description?: string | undefined;
  slug?: string | undefined;
  variant?: string | undefined;
};

/** Shape returned by the getRegistryComponent tool. */
export type RegistryComponentResult = RegistryItem | null;

/** Shape returned by the listExamples tool. */
export type ExampleResult = {
  name: string;
  title?: string | undefined;
  slug?: string | undefined;
  variant?: string | undefined;
  description?: string | undefined;
};

/** Shape returned by the listBlocks tool. */
export type BlockResult = {
  name: string;
  title?: string | undefined;
  description?: string | undefined;
};

// ---------------------------------------------------------------------------
// Tool handler implementations — imported by the MCP server wiring below.
// ---------------------------------------------------------------------------

export function handleSearchRegistry(query: string): SearchResult[] {
  return searchRegistry(query).map(({ name, title, type, description, slug, variant }) => ({
    name,
    title,
    type,
    description,
    slug,
    variant,
  }));
}

export function handleGetRegistryComponent(name: string): RegistryComponentResult {
  return getRegistryItem(name) ?? null;
}

export function handleListExamples(slug?: string): ExampleResult[] {
  const items: RegistryItem[] = slug
    ? getExamplesForSlug(slug)
    : listExampleNames()
        .map((n) => {
          const found = listAllItems().find((i) => i.name === n);
          return found ?? null;
        })
        .filter((i): i is RegistryItem => i !== null);

  return items.map(({ name, title, slug: s, variant, description }) => ({
    name,
    title,
    slug: s,
    variant,
    description,
  }));
}

export function handleListBlocks(): BlockResult[] {
  const results: BlockResult[] = [];
  for (const n of listBlockNames()) {
    const item = getRegistryItem(n);
    if (!item) continue;
    const result: BlockResult = { name: item.name };
    if (item.title !== undefined) result.title = item.title;
    if (item.description !== undefined) result.description = item.description;
    results.push(result);
  }
  return results;
}

// ---------------------------------------------------------------------------
// Entry point — prints install instructions until the SDK is added.
// ---------------------------------------------------------------------------

const IS_MAIN =
  // tsx / ts-node set import.meta.url; compare against argv[1]
  typeof process !== "undefined" &&
  process.argv[1] != null &&
  process.argv[1].endsWith("server.ts");

if (IS_MAIN) {
  // TODO: Replace this block with the MCP server wiring once
  //       @modelcontextprotocol/sdk is installed (see bottom of file).
  process.stdout.write(
    "Install @modelcontextprotocol/sdk to enable the registry MCP server.\n" +
      "Run: pnpm add @modelcontextprotocol/sdk\n",
  );
  process.exit(0);
}

// ---------------------------------------------------------------------------
// TODO: MCP server wiring (uncomment after installing the SDK)
// ---------------------------------------------------------------------------
//
// import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// import { z } from "zod";
//
// const server = new McpServer({
//   name: "starter-registry",
//   version: "1.0.0",
// });
//
// server.tool(
//   "searchRegistry",
//   "Search the component registry by keyword. Returns matching items with name, title, type, description, slug, and variant.",
//   { query: z.string().describe("Search term. Matched against name, title, description, categories, related.") },
//   async ({ query }) => ({
//     content: [{ type: "text", text: JSON.stringify(handleSearchRegistry(query), null, 2) }],
//   }),
// );
//
// server.tool(
//   "getRegistryComponent",
//   "Fetch full RegistryItem metadata for a component by its unique kebab-case name (e.g. 'button', 'button-outline').",
//   { name: z.string().describe("Unique registry name, e.g. 'button' or 'login-card'.") },
//   async ({ name }) => ({
//     content: [{ type: "text", text: JSON.stringify(handleGetRegistryComponent(name), null, 2) }],
//   }),
// );
//
// server.tool(
//   "listExamples",
//   "List example registry items. Pass a slug to scope to one primitive (e.g. 'button'); omit to list all examples.",
//   { slug: z.string().optional().describe("Primitive slug, e.g. 'button'. Omit for all examples.") },
//   async ({ slug }) => ({
//     content: [{ type: "text", text: JSON.stringify(handleListExamples(slug), null, 2) }],
//   }),
// );
//
// server.tool(
//   "listBlocks",
//   "List all block registry items (page-level compositions like login-card, signup-card).",
//   {},
//   async () => ({
//     content: [{ type: "text", text: JSON.stringify(handleListBlocks(), null, 2) }],
//   }),
// );
//
// const transport = new StdioServerTransport();
// await server.connect(transport);
