import { ComponentPreview } from "@/app/showcase/_components/component-preview";
import { Demo, Section } from "@/components/showcase/section";
import { ScrollToTop } from "@/components/showcase/scroll-to-top";
import { getRegistryItem, listBlockNames } from "@/lib/registry";

export default function ShowcaseBlocksPage() {
  const blockNames = listBlockNames();
  const toc = blockNames.map((name) => {
    const item = getRegistryItem(name);
    return { id: name, label: item?.title ?? name };
  });

  return (
    <div className="min-h-svh bg-background">
      <header className="mx-auto max-w-6xl px-6 pt-12">
        <h1 className="text-4xl font-bold tracking-tight">Block catalog</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Page-level composed blocks. Each block assembles multiple primitives into a ready-to-use
          layout. Drop into any route and customise via props.
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
        {blockNames.map((name) => {
          const item = getRegistryItem(name);
          if (!item) return null;
          return (
            <Section
              key={name}
              id={name}
              title={item.title ?? name}
              {...(item.description ? { description: item.description } : {})}
            >
              <Demo name={item.title ?? name} span={3} height="tall">
                <ComponentPreview name={name} className="w-full" />
              </Demo>
            </Section>
          );
        })}
      </main>
      <ScrollToTop />
    </div>
  );
}
