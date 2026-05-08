/**
 * @slug typography
 * @variant inline-code
 * @upstream https://ui.shadcn.com/docs/components/typography
 * @deviations ["px-[0.3rem] py-[0.2rem] are verbatim from upstream shadcn typography; not project-invented arbitrary values."]
 */
export default function TypographyInlineCode() {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      @radix-ui/react-alert-dialog
    </code>
  );
}
