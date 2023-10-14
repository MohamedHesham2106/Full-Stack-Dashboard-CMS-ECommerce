import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MobileMainNavigation } from "./navigation/mobile-main-navigation";

export const MobileToggle = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden hover:bg-none">
          <Menu className="w-9 h-9 text-zinc-500 " />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="py-8">
        <MobileMainNavigation />
      </SheetContent>
    </Sheet>
  );
};
