/**
 * @slug tabs
 * @variant disabled
 * @upstream https://ui.shadcn.com/docs/components/tabs
 * @deviations []
 */
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsDisabled() {
  return (
    <Tabs defaultValue="home">
      <TabsList>
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="settings" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
