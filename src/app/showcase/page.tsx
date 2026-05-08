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

function buildSlugLists() {
  const all = [...listUiSlugs()].sort().filter((slug) => getExamplesForSlug(slug).length > 0);

  const standard: string[] = [];
  const newComponents: string[] = [];

  for (const slug of all) {
    const ui = getRegistryItem(slug);
    if (ui?.proposedGroup) {
      newComponents.push(slug);
    } else {
      standard.push(slug);
    }
  }

  return { standard, newComponents };
}

function SlugSection({ slug }: { slug: string }) {
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
}

export default function ShowcasePage() {
  const { standard, newComponents } = buildSlugLists();

  const standardToc = standard.map((slug) => {
    const ui = getRegistryItem(slug);
    return { id: slug, label: ui?.title ?? slug };
  });
  const newToc = newComponents.map((slug) => {
    const ui = getRegistryItem(slug);
    return {
      id: slug,
      label: ui?.title ?? slug,
      proposedGroup: ui?.proposedGroup,
    };
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
          {standardToc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-[var(--radius)] border border-border bg-card px-2.5 py-1 hover:bg-accent"
            >
              {item.label}
            </a>
          ))}
          {newToc.length > 0 && (
            <a
              href="#new-components"
              className="rounded-[var(--radius)] border border-primary bg-primary/10 px-2.5 py-1 font-medium text-primary hover:bg-primary/20"
            >
              New Components ({newToc.length})
            </a>
          )}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-12">
        {standard.map((slug) => (
          <SlugSection key={slug} slug={slug} />
        ))}

        {newComponents.length > 0 && (
          <section id="new-components" className="scroll-mt-24 border-t border-border pt-12 pb-16">
            <div className="mb-10">
              <h2 className="text-2xl font-bold tracking-tight">New Components</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Components from external registries under evaluation.
              </p>
            </div>
            <div className="space-y-10">
              {newComponents.map((slug) => {
                const ui = getRegistryItem(slug);
                const examples = getExamplesForSlug(slug);
                if (!ui || examples.length === 0) return null;
                return (
                  <div key={slug} id={slug} className="scroll-mt-24">
                    <div className="mb-4 flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{ui.title ?? slug}</h3>
                      {ui.proposedGroup && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          {ui.proposedGroup}
                        </span>
                      )}
                    </div>
                    {ui.description && (
                      <p className="mb-4 text-sm text-muted-foreground">{ui.description}</p>
                    )}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {examples.map((ex) => (
                        <Demo
                          key={ex.name}
                          name={ex.title ?? ex.variant ?? ex.name}
                          isNew
                          {...(ex.span ? { span: ex.span } : {})}
                          {...(ex.height ? { height: ex.height } : {})}
                        >
                          <ComponentPreview name={ex.name} className="w-full" />
                        </Demo>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
      <ScrollToTop />
    </div>
  );
}
