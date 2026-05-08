/**
 * @slug tags-input
 * @variant default
 * @upstream https://www.diceui.com/docs/components/radix/tags-input
 * @deviations ["Token classes replace hardcoded palette."]
 */
"use client";

import * as React from "react";

import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputLabel,
  TagsInputList,
} from "@/components/ui/tags-input";

export default function TagsInputDefault() {
  const [tags, setTags] = React.useState(["React", "TypeScript", "Tailwind"]);

  return (
    <TagsInput value={tags} onValueChange={setTags}>
      <TagsInputLabel>Technologies</TagsInputLabel>
      <TagsInputList>
        {tags.map((tag) => (
          <TagsInputItem key={tag} value={tag}>
            {tag}
          </TagsInputItem>
        ))}
        <TagsInputInput placeholder="Add tag..." />
      </TagsInputList>
    </TagsInput>
  );
}
