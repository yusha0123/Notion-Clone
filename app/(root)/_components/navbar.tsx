"use client";

import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useIsScrolled } from "@/hooks/use-is-Scrolled";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const isScrolled = useIsScrolled();

  return (
    <nav
      className={cn(
        "z-50 fixed top-0 bg-background flex items-center dark:bg-[#1F1F1F] justify-between inset-x-0 p-3 md:p-6",
        isScrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
