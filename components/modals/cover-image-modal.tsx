"use client";

import useCoverImage from "@/hooks/use-cover-image";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { SingleImageDropzone } from "@/components/image-dropzone";

const CoverImageModal = () => {
  const { isOpen, onClose } = useCoverImage();
  const params = useParams();
  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const update = useMutation(api.documents.updateDocument);

  const handleClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    onClose();
  };

  const handleChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const image = await edgestore.publicFiles.upload({
        file,
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: image.url,
      });
      handleClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={handleChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
