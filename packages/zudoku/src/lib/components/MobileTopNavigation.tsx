import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../authentication/hook.js";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/Drawer.js";
import { useZudoku } from "./context/ZudokuContext.js";
import { Search } from "./Search.js";
import { ThemeSwitch } from "./ThemeSwitch.js";
import { isHiddenItem, TopNavItem } from "./TopNavigation.js";

export const MobileTopNavigation = () => {
  const { topNavigation } = useZudoku();
  const { isAuthenticated } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Drawer
      direction="right"
      open={drawerOpen}
      onOpenChange={(open) => setDrawerOpen(open)}
    >
      <div className="flex lg:hidden justify-self-end">
        <DrawerTrigger className="lg:hidden">
          <MenuIcon size={22} />
        </DrawerTrigger>
      </div>
      <DrawerContent
        className="lg:hidden h-[100dvh] right-0 left-auto w-[320px] rounded-none"
        aria-describedby={undefined}
      >
        <div className="p-4 overflow-y-auto overscroll-none">
          <VisuallyHidden>
            <DrawerTitle>Navigation</DrawerTitle>
          </VisuallyHidden>
          <Search className="flex p-4" />
          <ul className="flex flex-col items-center gap-4 p-4">
            <li>
              <ThemeSwitch />
            </li>
            {topNavigation.filter(isHiddenItem(isAuthenticated)).map((item) => (
              <li key={item.label}>
                <button onClick={() => setDrawerOpen(false)}>
                  <TopNavItem {...item} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
