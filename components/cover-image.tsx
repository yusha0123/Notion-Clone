"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "./ui/button";
import useCoverImage from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

type Props = {
  url?: string;
  preview?: boolean;
};

const CoverImage = ({ url, preview }: Props) => {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const { onReplace } = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const handleRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url,
      });
    }

    removeCoverImage({
      id: params.documentId as Id<"documents">,
    });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[10vh]",
        url && "bg-muted"
      )}
    >
      {!!url && (
        <Image src={url} fill alt="cover-image" className="object-cover" />
      )}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => onReplace(url)}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>
          <Button
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
            onClick={handleRemove}
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default CoverImage;
