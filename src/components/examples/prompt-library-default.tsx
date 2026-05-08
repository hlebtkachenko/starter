/**
 * @slug prompt-library
 * @variant default
 * @upstream custom
 * @deviations ["Token classes replace hardcoded palette."]
 */

import {
  type Prompt,
  PromptLibrary,
  PromptLibraryContent,
  PromptLibraryCreateDialog,
  PromptLibraryCreateTrigger,
  PromptLibraryEmpty,
  PromptLibraryFooter,
  PromptLibraryGroup,
  PromptLibraryItem,
  PromptLibraryList,
  PromptLibrarySearch,
  PromptLibraryTrigger,
} from "@/components/ui/prompt-library";

const PROMPTS: Prompt[] = [
  {
    id: "1",
    title: "Code Review",
    description: "Review code for best practices and bugs",
    prompt: "Review the following code for best practices, potential bugs, and performance issues.",
    category: "Development",
  },
  {
    id: "2",
    title: "Summarize",
    description: "Create a concise summary of text",
    prompt: "Summarize the following text in 2-3 sentences, keeping the key points.",
    category: "Writing",
  },
  {
    id: "3",
    title: "Explain",
    description: "Explain a concept simply",
    prompt: "Explain the following concept in simple terms that a beginner could understand.",
    category: "Learning",
  },
];

export default function PromptLibraryDefault() {
  return (
    <div className="flex items-center justify-center">
      <PromptLibrary prompts={PROMPTS}>
        <PromptLibraryTrigger />
        <PromptLibraryContent>
          <PromptLibrarySearch />
          <PromptLibraryList>
            <PromptLibraryEmpty />
            <PromptLibraryGroup heading="Templates">
              {PROMPTS.map((prompt) => (
                <PromptLibraryItem key={prompt.id} prompt={prompt} />
              ))}
            </PromptLibraryGroup>
          </PromptLibraryList>
          <PromptLibraryFooter>
            <PromptLibraryCreateTrigger />
          </PromptLibraryFooter>
        </PromptLibraryContent>
        <PromptLibraryCreateDialog />
      </PromptLibrary>
    </div>
  );
}
