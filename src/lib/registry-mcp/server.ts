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
 * Register in ~/.claude.json:
 *   "starter-registry": {
 *     "command": "pnpm",
 *     "args": ["mcp:registry-server"],
 *     "cwd": "<path-to-gwangju>"
 *   }
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import {
  searchRegistry,
  getRegistryItem,
  getExamplesForSlug,
  listExampleNames,
  listBlockNames,
  listAllItems,
} from "@/lib/registry";
import type { RegistryItem } from "@/lib/registry-schema";

export type SearchResult = {
  name: string;
  type: RegistryItem["type"];
  title?: string | undefined;
  description?: string | undefined;
  slug?: string | undefined;
  variant?: string | undefined;
};

export type RegistryComponentResult = RegistryItem | null;

export type ExampleResult = {
  name: string;
  title?: string | undefined;
  slug?: string | undefined;
  variant?: string | undefined;
  description?: string | undefined;
};

export type BlockResult = {
  name: string;
  title?: string | undefined;
  description?: string | undefined;
};

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

const server = new McpServer({
  name: "starter-registry",
  version: "1.0.0",
});

server.tool(
  "searchRegistry",
  "Search the component registry by keyword. Returns matching items with name, title, type, description, slug, and variant.",
  {
    query: z
      .string()
      .describe("Search term. Matched against name, title, description, categories, related."),
  },
  async ({ query }) => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(handleSearchRegistry(query), null, 2),
      },
    ],
  }),
);

server.tool(
  "getRegistryComponent",
  "Fetch full RegistryItem metadata for a component by its unique kebab-case name (e.g. 'button', 'button-outline').",
  {
    name: z.string().describe("Unique registry name, e.g. 'button' or 'login-card'."),
  },
  async ({ name }) => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(handleGetRegistryComponent(name), null, 2),
      },
    ],
  }),
);

server.tool(
  "listExamples",
  "List example registry items. Pass a slug to scope to one primitive (e.g. 'button'); omit to list all examples.",
  {
    slug: z.string().optional().describe("Primitive slug, e.g. 'button'. Omit for all examples."),
  },
  async ({ slug }) => ({
    content: [{ type: "text", text: JSON.stringify(handleListExamples(slug), null, 2) }],
  }),
);

server.tool(
  "listBlocks",
  "List all block registry items (page-level compositions like login-card, signup-card).",
  {},
  async () => ({
    content: [{ type: "text", text: JSON.stringify(handleListBlocks(), null, 2) }],
  }),
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
