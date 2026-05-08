import { ComponentPreview } from "@/app/showcase/_components/component-preview";
import { Demo, Section } from "@/components/showcase/section";
import { ScrollToTop } from "@/components/showcase/scroll-to-top";
import { TokenControls } from "@/components/showcase/token-controls";
import { getExamplesForSlug, getRegistryItem, listUiSlugs } from "@/lib/registry";

const SCROLL_GUARD = `
(function(){
  try {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    var nav = performance.getEntriesByType('navigation')[0];
    var isReload = nav && nav.type === 'reload';
    if (isReload && location.hash) {
      history.replaceState(null, '', location.pathname + location.search);
    }
    if (location.hash) return;
    var stop = Date.now() + 2000;
    var pin = function(){
      window.scrollTo(0, 0);
      if (Date.now() < stop) requestAnimationFrame(pin);
    };
    pin();
  } catch(e) {}
})();
`;

/**
 * Build the alphabetical list of slugs that have at least one example variant.
 * Slugs without examples (e.g. blocks-only) are surfaced on /showcase/blocks
 * once that page lands.
 */
function buildSlugList(): string[] {
  return [...listUiSlugs()].sort().filter((slug) => getExamplesForSlug(slug).length > 0);
}

export default function ShowcasePage() {
  const slugs = buildSlugList();
  const toc = slugs.map((slug) => {
    const ui = getRegistryItem(slug);
    return { id: slug, label: ui?.title ?? slug };
  });

  return (
    <div className="min-h-svh bg-background">
      <script dangerouslySetInnerHTML={{ __html: SCROLL_GUARD }} />
      <TokenControls />
      <header className="mx-auto max-w-6xl px-6 pt-12">
        <h1 className="text-4xl font-bold tracking-tight">shadcn showcase</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Every shadcn component with all documented variants. Drag the radius slider to see effects
          roll through every component live.
        </p>
        <nav className="mt-6 flex flex-wrap gap-1.5 text-xs">
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-[var(--radius)] border border-border bg-card px-2.5 py-1 hover:bg-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-12">
        {slugs.map((slug) => {
          const ui = getRegistryItem(slug);
          const examples = getExamplesForSlug(slug);
          if (!ui || examples.length === 0) return null;
          return (
            <Section
              key={slug}
              id={slug}
              title={ui.title ?? slug}
              {...(ui.description ? { description: ui.description } : {})}
            >
              {examples.map((ex) => (
                <Demo
                  key={ex.name}
                  name={ex.title ?? ex.variant ?? ex.name}
                  {...(ex.span ? { span: ex.span } : {})}
                  {...(ex.height ? { height: ex.height } : {})}
                  {...(ex.isFlagged ? { flagged: true } : {})}
                >
                  <ComponentPreview name={ex.name} className="w-full" />
                </Demo>
              ))}
            </Section>
          );
        })}
      </main>
      <ScrollToTop />
    </div>
  );
}
