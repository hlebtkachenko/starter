/**
 * @slug timeline
 * @variant default
 * @upstream https://www.diceui.com/docs/components/radix/timeline
 * @deviations ["Token classes replace hardcoded palette."]
 */

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineHeader,
  TimelineItem,
  TimelineTitle,
} from "@/components/ui/timeline";

export default function TimelineDefault() {
  return (
    <Timeline activeIndex={1}>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Project kickoff</TimelineTitle>
            <TimelineDescription>
              Initial requirements gathered and team assembled.
            </TimelineDescription>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Development in progress</TimelineTitle>
            <TimelineDescription>Core features are being built and tested.</TimelineDescription>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>Launch</TimelineTitle>
            <TimelineDescription>Deploy to production and announce to users.</TimelineDescription>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
