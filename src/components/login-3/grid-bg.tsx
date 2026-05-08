export function GridBg() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full text-foreground/[0.04]"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="login3-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#login3-grid)" />
    </svg>
  );
}
