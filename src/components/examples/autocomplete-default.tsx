/**
 * @slug autocomplete
 * @variant default
 * @upstream https://coss.com/ui/docs/components/autocomplete
 * @deviations ["Uses native input styling instead of coss Input primitive.", "ScrollArea without coss-specific props."]
 */
"use client";

import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/components/ui/autocomplete";

const FRAMEWORKS = [
  "Next.js",
  "Remix",
  "Astro",
  "Nuxt",
  "SvelteKit",
  "Gatsby",
  "Angular",
  "SolidStart",
];

export default function AutocompleteDefault() {
  return (
    <div className="w-full max-w-sm">
      <Autocomplete>
        <AutocompleteInput placeholder="Search frameworks..." showClear />
        <AutocompletePopup>
          <AutocompleteList>
            <AutocompleteEmpty>No frameworks found.</AutocompleteEmpty>
            {FRAMEWORKS.map((fw) => (
              <AutocompleteItem key={fw} value={fw}>
                {fw}
              </AutocompleteItem>
            ))}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  );
}
