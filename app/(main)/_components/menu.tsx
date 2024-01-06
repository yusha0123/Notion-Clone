"use client";

import { Id } from "@/convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, TrashIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  documentId: Id<"documents">;
};

const Menu = ({ documentId }: Props) => {
  const router = useRouter();
  const { user } = useUser();
  const archieve = useMutation(api.documents.archieve);

  const handleArchive = () => {
    const promise = archieve({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note Deleted!",
      error: "Failed to delete note.",
    });

    router.push("/documents");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} variant={"ghost"}>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        forceMount
        alignOffset={8}
      >
        <DropdownMenuItem onClick={handleArchive}>
          <TrashIcon className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Last edited by {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = () => <Skeleton className="h-10 w-10" />;

export default Menu;
