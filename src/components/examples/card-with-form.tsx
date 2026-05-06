import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function CardWithForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Subscribe</CardTitle>
        <CardDescription>Get product updates.</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Input type="email" placeholder="m@example.com" />
        <Button>Send</Button>
      </CardContent>
    </Card>
  );
}
