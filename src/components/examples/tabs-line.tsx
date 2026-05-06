/**
 * @slug tabs
 * @variant line
 * @upstream https://ui.shadcn.com/docs/components/tabs
 * @deviations []
 */
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsLine() {
  return (
    <Tabs defaultValue="overview">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
