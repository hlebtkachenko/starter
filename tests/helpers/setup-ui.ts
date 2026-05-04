// Vitest setup: jsdom project. Polyfills + jest-dom matchers.

// import "@testing-library/jest-dom/vitest";

// Radix primitives + many UI libs touch browser APIs jsdom does not implement.
// Stub them up-front so tests don't crash with cryptic "X is not a function".

if (typeof globalThis.ResizeObserver === "undefined") {
  // @ts-expect-error: minimal polyfill
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (typeof globalThis.IntersectionObserver === "undefined") {
  // @ts-expect-error: minimal polyfill
  globalThis.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };
}

if (typeof globalThis.matchMedia === "undefined") {
  // @ts-expect-error: minimal polyfill (theme + responsive hooks read this)
  globalThis.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// jsdom's HTMLElement is missing pointer-capture methods Radix uses on Select/Popover.
if (typeof HTMLElement !== "undefined") {
  if (!HTMLElement.prototype.hasPointerCapture) {
    HTMLElement.prototype.hasPointerCapture = () => false;
  }
  if (!HTMLElement.prototype.setPointerCapture) {
    HTMLElement.prototype.setPointerCapture = () => {};
  }
  if (!HTMLElement.prototype.releasePointerCapture) {
    HTMLElement.prototype.releasePointerCapture = () => {};
  }
  if (!HTMLElement.prototype.scrollIntoView) {
    HTMLElement.prototype.scrollIntoView = () => {};
  }
}
