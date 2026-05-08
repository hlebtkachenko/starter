import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// ---------------------------------------------------------------------------
// Local rule: no-input-otp-default-value
// Blocks <InputOTP defaultValue=...> JSX attribute.
// Rationale: input-otp renders both value and defaultValue on its hidden
// <input>, triggering React's "controlled or uncontrolled" warning.
// ---------------------------------------------------------------------------
const noInputOtpDefaultValue = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow defaultValue prop on <InputOTP> — use value + onChange instead.",
    },
    messages: {
      noDefault:
        "<InputOTP defaultValue=...> causes a React controlled/uncontrolled warning. Use value + onChange.",
    },
    schema: [],
  },
  create(context) {
    return {
      "JSXOpeningElement[name.name='InputOTP'] JSXAttribute[name.name='defaultValue']"(node) {
        context.report({ node, messageId: "noDefault" });
      },
    };
  },
};

// ---------------------------------------------------------------------------
// Local rule: no-inline-hex
// Blocks arbitrary hex color utilities like bg-[#fff], text-[#123456], etc.
// inside src/components/**. Tailwind palette utilities (bg-amber-50) are fine.
// Only the [#...] arbitrary-value form is blocked.
// ---------------------------------------------------------------------------
const INLINE_HEX_RE =
  /(bg|text|border|ring|fill|stroke|outline|decoration|divide|placeholder|caret|accent)-\[#[0-9a-fA-F]{3,8}\]/;

const noInlineHex = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Disallow inline hex color utilities like bg-[#fff] — use CSS token vars instead.",
    },
    messages: {
      noHex:
        'Inline hex color "{{value}}" detected. Use a CSS token class (e.g. bg-primary) or define a token in globals.css.',
    },
    schema: [],
  },
  create(context) {
    function check(node, raw) {
      const match = INLINE_HEX_RE.exec(raw);
      if (match) {
        context.report({ node, messageId: "noHex", data: { value: match[0] } });
      }
    }
    return {
      Literal(node) {
        if (typeof node.value === "string") check(node, node.value);
      },
      TemplateElement(node) {
        check(node, node.value.raw);
      },
    };
  },
};

// ---------------------------------------------------------------------------
// Local rule: no-arbitrary-radius
// Blocks rounded-[Xpx], rounded-[Xrem], rounded-[Xem], etc.
// Allows any form that references a CSS variable (var(, calc(var(, min(var(,
// max(var(, clamp(var()) or the cascade keyword "inherit".
// ---------------------------------------------------------------------------
const ARBITRARY_RADIUS_RE =
  /\brounded-\[(?!var\(|calc\(var\(|min\(var\(|max\(var\(|clamp\(var\(|inherit)[^\]]+\]/;

const noArbitraryRadius = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Disallow arbitrary radius utilities like rounded-[8px] — use token-based forms like rounded-[var(--radius)].",
    },
    messages: {
      noArbitrary:
        'Arbitrary radius "{{value}}" detected. Use rounded-[var(--radius)] or a Tailwind radius scale class.',
    },
    schema: [],
  },
  create(context) {
    function check(node, raw) {
      const match = ARBITRARY_RADIUS_RE.exec(raw);
      if (match) {
        context.report({ node, messageId: "noArbitrary", data: { value: match[0] } });
      }
    }
    return {
      Literal(node) {
        if (typeof node.value === "string") check(node, node.value);
      },
      TemplateElement(node) {
        check(node, node.value.raw);
      },
    };
  },
};

// ---------------------------------------------------------------------------
// Local rule: no-oklch
// Blocks any oklch( substring in source files (except node_modules/).
// CSS comment lines are not parsed by ESLint JS/TS parser, so this only
// fires on string literals and template strings in TS/TSX files.
// ---------------------------------------------------------------------------
const OKLCH_RE = /oklch\s*\(/;

const noOklch = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow oklch() color functions — use hex tokens defined in globals.css.",
    },
    messages: {
      noOklch: "oklch() is not allowed. Define hex color tokens in globals.css :root instead.",
    },
    schema: [],
  },
  create(context) {
    function check(node, raw) {
      if (OKLCH_RE.test(raw)) {
        context.report({ node, messageId: "noOklch" });
      }
    }
    return {
      Literal(node) {
        if (typeof node.value === "string") check(node, node.value);
      },
      TemplateElement(node) {
        check(node, node.value.raw);
      },
    };
  },
};

// ---------------------------------------------------------------------------
// Plugin wrapper — bundles all four local rules under a single plugin prefix.
// ---------------------------------------------------------------------------
const localRulesPlugin = {
  meta: { name: "local-rules" },
  rules: {
    "no-input-otp-default-value": noInputOtpDefaultValue,
    "no-inline-hex": noInlineHex,
    "no-arbitrary-radius": noArbitraryRadius,
    "no-oklch": noOklch,
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    "_junk/**",
    ".next/**",
    ".turbo/**",
    ".sst/**",
    "out/**",
    "build/**",
    "dist/**",
    "next-env.d.ts",
    ".planning/**",
    ".claude/**",
    "docs/**",
    "node_modules/**",
    "infra/**",
    "db/**",
    "tests/**",
    "scripts/**",
    "sst.config.ts",
    "commitlint.config.ts",
    "knip.config.ts",
    "vitest.config.ts",
    "playwright.config.ts",
    "**/_TEMPLATE*",
    "src/components/__index__.tsx",
  ]),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
    },
  },
  // Wave 2 — ESLint guards (component registry phase 3d)
  // Applied to all component and app source files.
  {
    plugins: { "local-rules": localRulesPlugin },
    files: ["src/components/**/*.{ts,tsx}", "src/app/**/*.{ts,tsx}"],
    rules: {
      // All four rules promoted to error after a clean lint pass.
      "local-rules/no-input-otp-default-value": "error",
      "local-rules/no-inline-hex": "error",
      "local-rules/no-oklch": "error",
      "local-rules/no-arbitrary-radius": "error",
    },
  },
]);

export default eslintConfig;
