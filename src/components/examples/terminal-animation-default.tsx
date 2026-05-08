/**
 * @slug terminal-animation
 * @variant default
 * @upstream custom
 * @deviations ["Token classes replace hardcoded palette."]
 */

import {
  defaultTerminalTabs,
  TerminalAnimationBlinkingCursor,
  TerminalAnimationCommandBar,
  TerminalAnimationContainer,
  TerminalAnimationContent,
  TerminalAnimationOutput,
  TerminalAnimationRoot,
  TerminalAnimationTabList,
  TerminalAnimationTabTrigger,
  TerminalAnimationTrailingPrompt,
  TerminalAnimationWindow,
} from "@/components/ui/terminal-animation";

export default function TerminalAnimationDefault() {
  return (
    <TerminalAnimationRoot tabs={defaultTerminalTabs} className="relative w-full overflow-hidden">
      <TerminalAnimationContainer>
        <TerminalAnimationTabList className="flex gap-1 px-2">
          {defaultTerminalTabs.map((tab, i) => (
            <TerminalAnimationTabTrigger
              key={tab.label}
              index={i}
              className="rounded-t-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors data-[state=active]:bg-card data-[state=active]:text-foreground"
            >
              {tab.label}
            </TerminalAnimationTabTrigger>
          ))}
        </TerminalAnimationTabList>
        <TerminalAnimationWindow minHeight="20rem" animateOnVisible={false}>
          <TerminalAnimationContent>
            <div className="font-mono text-sm leading-relaxed">
              <div className="flex items-center gap-2">
                <span className="text-primary">$</span>
                <TerminalAnimationCommandBar className="text-foreground" />
              </div>
              <TerminalAnimationOutput
                renderLine={(line, index, visible) =>
                  visible ? (
                    <div key={index} className={line.color}>
                      {line.text || " "}
                    </div>
                  ) : null
                }
              />
              <TerminalAnimationTrailingPrompt className="flex items-center gap-2">
                <span className="text-primary">$</span>
                <TerminalAnimationBlinkingCursor />
              </TerminalAnimationTrailingPrompt>
            </div>
          </TerminalAnimationContent>
        </TerminalAnimationWindow>
      </TerminalAnimationContainer>
    </TerminalAnimationRoot>
  );
}
