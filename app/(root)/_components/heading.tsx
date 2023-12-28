"use client";

import Loading from "@/components/Loading";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Write, plan, share.
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Notion is the connected workspace where better, faster work happens.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Loading size={"lg"} />
        </div>
      )}
      {!isLoading && isAuthenticated && (
        <Link
          className={cn(buttonVariants({ size: "sm" }), "md:inline-flex")}
          href={"/documents"}
        >
          Enter Notion
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      )}
      {!isLoading && !isAuthenticated && (
        <SignInButton mode="modal">
          <Button size={"sm"}>
            Get Notion free
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Heading;
