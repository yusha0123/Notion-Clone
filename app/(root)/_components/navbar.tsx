"use client";

import Loading from "@/components/Loading";
import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { useIsScrolled } from "@/hooks/use-is-Scrolled";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const isScrolled = useIsScrolled();
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <nav
      className={cn(
        "z-50 fixed top-0 bg-background flex items-center dark:bg-[#1F1F1F] justify-between inset-x-0 p-3 md:px-8 md:py-4",
        isScrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="flex items-center gap-x-4">
        {isLoading && <Loading />}
        {!isLoading && !isAuthenticated && (
          <>
            <SignInButton mode="modal">
              <Button size={"sm"} variant={"ghost"}>
                Login
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size={"sm"} className="hidden md:flex">
                Get Notion free
              </Button>
            </SignInButton>
          </>
        )}
        {!isLoading && isAuthenticated && (
          <>
            <UserButton afterSignOutUrl="/" />
            <Link
              className={cn(buttonVariants({ size: "sm" }), "hidden md:flex")}
              href={"/documents"}
            >
              Enter Notion
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
