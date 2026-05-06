/**
 * @slug tabs
 * @variant vertical
 * @upstream https://ui.shadcn.com/docs/components/tabs
 * @deviations []
 */
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsVertical() {
  return (
    <Tabs defaultValue="account" orientation="vertical">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
