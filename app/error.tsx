"use client";

import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Error() {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/error.png"
        height="300"
        width="300"
        alt="Error"
        className="dark:hidden"
      />
      <Image
        src="/error-dark.png"
        height="300"
        width="300"
        alt="Error"
        className="hidden dark:block"
      />
      <h2 className="text-xl font-medium">Something went wrong!</h2>
      <Link className={buttonVariants()} href={"/documents"}>
        Go Back
      </Link>
    </div>
  );
}
