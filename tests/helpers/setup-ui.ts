// Vitest setup — jsdom project. Polyfills + jest-dom matchers.

// import "@testing-library/jest-dom/vitest";

// Polyfill ResizeObserver for Radix primitives if needed
if (typeof globalThis.ResizeObserver === "undefined") {
  // @ts-expect-error — minimal polyfill
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
