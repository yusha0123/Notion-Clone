import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {
  documentId: Id<"documents">;
};

const Banner = ({ documentId }: Props) => {
  const router = useRouter();
  const remove = useMutation(api.documents.removeDocument);
  const restore = useMutation(api.documents.restoreDocument);

  const handleRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note Deleted Permanently!",
      error: "Failed to delete note.",
    });

    router.push("/documents");
  };

  const handleRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note Restored!",
      error: "Failed to restore note.",
    });
  };

  return (
    <div className="text-center w-full bg-rose-500 text-white flex items-center justify-center p-2 text-sm gap-x-2">
      <p>This page is in the Trash</p>
      <Button
        size={"sm"}
        variant={"outline"}
        onClick={handleRestore}
        className="border-white bg-transparent hover:text-white hover:bg-primary/5 h-auto font-normal p-1 px-2"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={handleRemove}>
        <Button
          size={"sm"}
          variant={"outline"}
          className="border-white bg-transparent hover:text-white hover:bg-primary/5 h-auto font-normal p-1 px-2"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
