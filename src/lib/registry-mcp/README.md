# registry-mcp

MCP server that exposes the component registry over stdio JSON-RPC. Any Claude Code chat registered against this server can search and inspect components without reading source files.

## Status

**Stub (SDK not yet installed).** The handler logic in `server.ts` is complete and type-checked. The stdio transport is commented out pending SDK installation.

To activate:

```bash
pnpm add @modelcontextprotocol/sdk
```

Then uncomment the `// TODO: MCP server wiring` block at the bottom of `server.ts` and remove the stub `IS_MAIN` block.

## Tools

| Tool | Input | Returns |
|---|---|---|
| `searchRegistry` | `query: string` | Array of `{ name, title, type, description, slug, variant }` matching the query. Matched against name, title, description, categories, related. |
| `getRegistryComponent` | `name: string` | Full `RegistryItem` metadata for the given kebab-case name, or `null` if not found. |
| `listExamples` | `slug?: string` | Array of `{ name, title, slug, variant, description }`. Pass a slug (e.g. `"button"`) to scope to one primitive; omit to list all examples. |
| `listBlocks` | (none) | Array of `{ name, title, description }` for all block registry items. |

## Register in ~/.claude.json

Add to the `mcpServers` object in `~/.claude.json`:

```json
"starter-registry": {
  "command": "pnpm",
  "args": ["mcp:registry-server"],
  "cwd": "/Users/hleb/Desktop/workspace/conductor/workspaces/starter/gwangju"
}
```

Full example `mcpServers` block:

```json
{
  "mcpServers": {
    "starter-registry": {
      "command": "pnpm",
      "args": ["mcp:registry-server"],
      "cwd": "/Users/hleb/Desktop/workspace/conductor/workspaces/starter/gwangju"
    }
  }
}
```

After saving, restart Claude Code. The tools appear as `mcp__starter-registry__searchRegistry`, `mcp__starter-registry__getRegistryComponent`, `mcp__starter-registry__listExamples`, `mcp__starter-registry__listBlocks`.

## Example tool calls

Search for button-related components:

```json
{
  "tool": "mcp__starter-registry__searchRegistry",
  "input": { "query": "button" }
}
```

Fetch full metadata for a specific item:

```json
{
  "tool": "mcp__starter-registry__getRegistryComponent",
  "input": { "name": "button-outline" }
}
```

List all button variants:

```json
{
  "tool": "mcp__starter-registry__listExamples",
  "input": { "slug": "button" }
}
```

List all blocks (page-level compositions):

```json
{
  "tool": "mcp__starter-registry__listBlocks",
  "input": {}
}
```

## Direct run

```bash
# Prints install instructions until SDK is added:
pnpm mcp:registry-server

# Or via tsx directly:
pnpm tsx src/lib/registry-mcp/server.ts
```
