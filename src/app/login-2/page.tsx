import { GalleryVerticalEndIcon } from "lucide-react";

import { LoginFormV2 } from "@/components/login-form-v2";

export default function LoginV2Page() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEndIcon className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginFormV2 />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#e5e5e5,transparent_60%),radial-gradient(circle_at_70%_80%,#d4d4d4,transparent_55%)]" />
      </div>
    </div>
  );
}
